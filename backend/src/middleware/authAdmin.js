import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No admin token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.admin = decoded; // { id, username }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired admin token." });
  }
};