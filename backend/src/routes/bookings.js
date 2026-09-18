import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";
import { getCustomerIdFromHeader } from "../utils/getCustomerId.js";

const router = express.Router();

// PUBLIC/CUSTOMER: create booking (works for guests too)
router.post("/", async (req, res) => {
  const { name, email, phone, eventType, eventDate, guests, packageId, message } = req.body;
  if (!name || !email || !phone || !eventType || !eventDate || !guests) {
    return res.status(400).json({ message: "Missing required booking fields." });
  }

  const customerId = getCustomerIdFromHeader(req);

  try {
    const result = await pool.query(
      `INSERT INTO bookings (customer_id, name, email, phone, event_type, event_date, guests, package_id, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [customerId, name, email, phone, eventType, eventDate, guests, packageId || null, message || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create booking." });
  }
});

// CUSTOMER: get own bookings (by email, since guests may not have accounts either)
router.get("/mine", async (req, res) => {
  const customerId = getCustomerIdFromHeader(req);
  if (!customerId) return res.status(401).json({ message: "Login required." });
  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE customer_id = $1 ORDER BY created_at DESC",
      [customerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// ADMIN: all bookings
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// ADMIN: update status
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  try {
    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Booking not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking." });
  }
});

export default router;