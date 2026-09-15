import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCurrentCustomer, logoutCustomer } from "../utils/storage";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const customer = getCurrentCustomer();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition ${
      isActive ? "text-brand-600" : "text-gray-700 hover:text-brand-600"
    }`;

  const handleLogout = () => {
    logoutCustomer();
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/packages", label: "Packages" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-brand-600">
            Starter <span className="text-gray-800">Station</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {customer ? (
            <>
              <Link
                to="/my-booking"
                className="text-sm font-medium text-gray-700 hover:text-brand-600"
              >
                Hi, {customer.name.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-full hover:bg-brand-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-brand-600"
              >
                Login
              </Link>
              <Link
                to="/booking"
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-full hover:bg-brand-700 transition"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 bg-white border-t">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}
          {customer ? (
            <>
              <Link to="/my-booking" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm">
                My Booking
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm">
                Login
              </Link>
              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-full text-center"
              >
                Book Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}