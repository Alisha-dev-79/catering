import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// PUBLIC: list all menu items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items ORDER BY category, name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch menu items." });
  }
});

// PUBLIC: single item
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Item not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch item." });
  }
});

// ADMIN: create
router.post("/", verifyAdmin, async (req, res) => {
  const { name, category, description, price, image, status } = req.body;
  if (!name || !category || price == null) {
    return res.status(400).json({ message: "name, category and price are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO menu_items (name, category, description, price, image, status)
       VALUES ($1, $2, $3, $4, $5, COALESCE($6, 'Available'))
       RETURNING *`,
      [name, category, description, price, image, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create item." });
  }
});

// ADMIN: update
router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, category, description, price, image, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE menu_items SET
         name = COALESCE($1, name),
         category = COALESCE($2, category),
         description = COALESCE($3, description),
         price = COALESCE($4, price),
         image = COALESCE($5, image),
         status = COALESCE($6, status)
       WHERE id = $7 RETURNING *`,
      [name, category, description, price, image, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Item not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update item." });
  }
});

// ADMIN: delete
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM menu_items WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Item not found." });
    res.json({ message: "Item deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete item." });
  }
});

export default router;