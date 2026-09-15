import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../utils/storage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginAdmin(form.username, form.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Starter <span className="text-brand-600">Station</span>
        </h1>
        <p className="text-gray-500 text-sm text-center mt-1">Admin Panel Login</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="admin"
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
              placeholder="admin123"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          Test credentials: admin / admin123
        </p>
      </div>
    </div>
  );
}