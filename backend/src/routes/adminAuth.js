import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
    const admin = result.rows[0];
    if (!admin) return res.status(401).json({ message: "Invalid admin credentials." });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid admin credentials." });

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during admin login." });
  }
});

export default router;