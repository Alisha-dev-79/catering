import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  try {
    const existing = await pool.query("SELECT id FROM customers WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO customers (name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, phone, created_at`,
      [name, email, phone, passwordHash]
    );

    res.status(201).json({ customer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
    const customer = result.rows[0];
    if (!customer) return res.status(401).json({ message: "Invalid email or password." });

    const match = await bcrypt.compare(password, customer.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: customer.id, name: customer.name, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
});

export default router;