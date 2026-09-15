import { Navigate } from "react-router-dom";
import { getCurrentCustomer } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  const customer = getCurrentCustomer();
  if (!customer) return <Navigate to="/login" replace />;
  return children;
}