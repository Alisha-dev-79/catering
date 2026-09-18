import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import menuItemRoutes from "./routes/menuItems.js";
import packageRoutes from "./routes/packages.js";
import serviceRoutes from "./routes/services.js";
import bookingRoutes from "./routes/bookings.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import contactRoutes from "./routes/contact.js";
import customerRoutes from "./routes/customers.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/customers", customerRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));