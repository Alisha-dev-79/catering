import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../utils/storage";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginCustomer(form.email, form.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/my-booking");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Customer Login</h1>
        <p className="text-gray-500 text-sm text-center mt-1">
          Login to view and manage your bookings
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="customer@test.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-600 font-semibold">
            Sign up
          </Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-4">
          Test credentials: customer@test.com / 123456
        </p>
      </div>
    </div>
  );
}