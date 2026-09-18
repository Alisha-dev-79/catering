import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";
import { getCustomerIdFromHeader } from "../utils/getCustomerId.js";

const router = express.Router();
const GST_RATE = 0.05;

// PUBLIC/CUSTOMER: place an order (dine-in or takeaway)
router.post("/", async (req, res) => {
  const { name, phone, orderType, tableNo, items } = req.body;
  // items: [{ menuItemId, quantity }]

  if (!name || !phone || !orderType || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "name, phone, orderType and at least one item are required." });
  }
  if (orderType === "Dine-in" && !tableNo) {
    return res.status(400).json({ message: "Table number is required for dine-in orders." });
  }

  const customerId = getCustomerIdFromHeader(req);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Fetch real, current prices from DB — never trust prices sent from the client
    const menuItemIds = items.map((i) => i.menuItemId);
    const menuResult = await client.query(
      "SELECT id, name, price, status FROM menu_items WHERE id = ANY($1::int[])",
      [menuItemIds]
    );

    const menuMap = new Map(menuResult.rows.map((m) => [m.id, m]));

    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const menuItem = menuMap.get(item.menuItemId);
      if (!menuItem) {
        throw { status: 400, message: `Menu item ${item.menuItemId} not found.` };
      }
      if (menuItem.status !== "Available") {
        throw { status: 400, message: `${menuItem.name} is currently unavailable.` };
      }
      const quantity = Number(item.quantity);
      if (!quantity || quantity < 1) {
        throw { status: 400, message: `Invalid quantity for ${menuItem.name}.` };
      }

      const lineTotal = Math.round(menuItem.price * quantity * 100) / 100;
      subtotal += lineTotal;

      orderItemsData.push({
        menuItemId: menuItem.id,
        itemName: menuItem.name,
        price: menuItem.price,
        quantity,
        lineTotal,
      });
    }

    const tax = Math.round(subtotal * GST_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const orderResult = await client.query(
      `INSERT INTO orders (customer_id, name, phone, table_no, order_type, subtotal, tax, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [customerId, name, phone, orderType === "Dine-in" ? tableNo : null, orderType, subtotal, tax, total]
    );
    const order = orderResult.rows[0];

    for (const oi of orderItemsData) {
      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, item_name, price, quantity, line_total)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, oi.menuItemId, oi.itemName, oi.price, oi.quantity, oi.lineTotal]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({ ...order, items: orderItemsData });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Failed to place order." });
  } finally {
    client.release();
  }
});

// CUSTOMER: own order history
router.get("/mine", async (req, res) => {
  const customerId = getCustomerIdFromHeader(req);
  if (!customerId) return res.status(401).json({ message: "Login required." });

  try {
    const orders = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC",
      [customerId]
    );
    const withItems = await attachItems(orders.rows);
    res.json(withItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

// Single order (used for the bill page — works for guest + logged in, matched by id)
router.get("/:id", async (req, res) => {
  try {
    const orderResult = await pool.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
    if (orderResult.rows.length === 0) return res.status(404).json({ message: "Order not found." });
    const [order] = await attachItems(orderResult.rows);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order." });
  }
});

// ADMIN: all orders
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    const withItems = await attachItems(orders.rows);
    res.json(withItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

// ADMIN: update status
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Preparing", "Served", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Order not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order." });
  }
});

// Helper: attach line items to a list of orders in one extra query (no N+1)
async function attachItems(orders) {
  if (orders.length === 0) return [];
  const orderIds = orders.map((o) => o.id);
  const itemsResult = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ANY($1::int[])",
    [orderIds]
  );
  return orders.map((o) => ({
    ...o,
    items: itemsResult.rows.filter((i) => i.order_id === o.id),
  }));
}

export default router;