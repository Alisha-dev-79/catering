import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// ADMIN: list customers with booking + order counts
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id, c.name, c.email, c.phone, c.created_at,
        COUNT(DISTINCT b.id) AS booking_count,
        COUNT(DISTINCT o.id) AS order_count
      FROM customers c
      LEFT JOIN bookings b ON b.customer_id = c.id
      LEFT JOIN orders o ON o.customer_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch customers." });
  }
});

export default router;