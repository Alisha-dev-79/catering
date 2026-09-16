import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentCustomer, logoutCustomer, getCartCount } from "../utils/storage";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());
  const navigate = useNavigate();
  const customer = getCurrentCustomer();

  // keep badge in sync when cart changes anywhere in the app
  useEffect(() => {
    const sync = () => setCartCount(getCartCount());
    window.addEventListener("storage", sync);
    window.addEventListener("cart-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart-updated", sync);
    };
  }, []);

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

  const CartIcon = () => (
    <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand-600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );

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
          <CartIcon />
          {customer ? (
            <>
              <Link to="/my-orders" className="text-sm font-medium text-gray-700 hover:text-brand-600">
                My Orders
              </Link>
              <Link to="/my-booking" className="text-sm font-medium text-gray-700 hover:text-brand-600">
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
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-brand-600">
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

        <div className="md:hidden flex items-center gap-2">
          <CartIcon />
          <button className="text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 bg-white border-t">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          {customer ? (
            <>
              <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm">
                My Orders
              </Link>
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