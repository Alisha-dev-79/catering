import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "./db.js";
dotenv.config();

const seed = async () => {
  const username = "admin";
  const password = "admin123"; // change after first login in production

  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO admins (username, password_hash) VALUES ($1, $2)
     ON CONFLICT (username) DO NOTHING`,
    [username, hash]
  );

  console.log(`✅ Admin seeded — username: ${username}, password: ${password}`);
  process.exit();
};

seed();