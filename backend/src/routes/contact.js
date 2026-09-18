import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "name, email and message are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, subject, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

export default router;