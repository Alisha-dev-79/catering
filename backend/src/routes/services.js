import express from "express";
import { pool } from "../db.js";
import { verifyAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch services." });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  const { name, description, price, status } = req.body;
  if (!name) return res.status(400).json({ message: "name is required." });
  try {
    const result = await pool.query(
      `INSERT INTO services (name, description, price, status)
       VALUES ($1, $2, $3, COALESCE($4, 'Available')) RETURNING *`,
      [name, description, price, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create service." });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, description, price, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE services SET
         name = COALESCE($1, name),
         description = COALESCE($2, description),
         price = COALESCE($3, price),
         status = COALESCE($4, status)
       WHERE id = $5 RETURNING *`,
      [name, description, price, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Service not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update service." });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM services WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Service not found." });
    res.json({ message: "Service deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete service." });
  }
});

export default router;