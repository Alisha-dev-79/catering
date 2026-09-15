import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../utils/storage";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const links = [
    { to: "/admin-dashboard", label: "Dashboard", icon: "📊" },
    { to: "/admin-bookings", label: "Bookings", icon: "📅" },
    { to: "/admin-menu", label: "Menu Items", icon: "🍽️" },
    { to: "/admin-packages", label: "Packages", icon: "📦" },
    { to: "/admin-services", label: "Services", icon: "🛎️" },
    { to: "/admin-payments", label: "Payments", icon: "💳" },
    { to: "/admin-customers", label: "Customers", icon: "👥" },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-brand-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-gray-800">
        <h2 className="text-white text-lg font-bold">
          Starter <span className="text-brand-500">Station</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass}>
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}