import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM packages ORDER BY price_per_person");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch packages." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM packages WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Package not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch package." });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  const { name, category, price_per_person, max_guests, status, includes } = req.body;
  if (!name || price_per_person == null) {
    return res.status(400).json({ message: "name and price_per_person are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO packages (name, category, price_per_person, max_guests, status, includes)
       VALUES ($1, $2, $3, $4, COALESCE($5, 'Available'), $6)
       RETURNING *`,
      [name, category, price_per_person, max_guests, status, includes || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create package." });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, category, price_per_person, max_guests, status, includes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE packages SET
         name = COALESCE($1, name),
         category = COALESCE($2, category),
         price_per_person = COALESCE($3, price_per_person),
         max_guests = COALESCE($4, max_guests),
         status = COALESCE($5, status),
         includes = COALESCE($6, includes)
       WHERE id = $7 RETURNING *`,
      [name, category, price_per_person, max_guests, status, includes, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Package not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update package." });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM packages WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Package not found." });
    res.json({ message: "Package deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete package." });
  }
});

export default router;