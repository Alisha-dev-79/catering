import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// Record a payment against either a booking or an order
router.post("/", async (req, res) => {
  const { bookingId, orderId, amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ message: "amount and method are required." });
  }
  if (!bookingId && !orderId) {
    return res.status(400).json({ message: "Either bookingId or orderId is required." });
  }
  if (!["UPI", "Card", "Cash"].includes(method)) {
    return res.status(400).json({ message: "Invalid payment method." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO payments (booking_id, order_id, amount, method)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [bookingId || null, orderId || null, amount, method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record payment." });
  }
});

// ADMIN: all payments
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payments." });
  }
});

export default router;