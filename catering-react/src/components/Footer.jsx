import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Starter <span className="text-brand-500">Station</span>
          </h3>
          <p className="text-sm text-gray-400">
            Crafting memorable events with delicious food, one plate at a time.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand-500">About Us</Link></li>
            <li><Link to="/menu" className="hover:text-brand-500">Our Menu</Link></li>
            <li><Link to="/packages" className="hover:text-brand-500">Packages</Link></li>
            <li><Link to="/services" className="hover:text-brand-500">Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-brand-500">Contact Us</Link></li>
            <li><Link to="/booking" className="hover:text-brand-500">Book an Event</Link></li>
            <li><Link to="/my-booking" className="hover:text-brand-500">Track Booking</Link></li>
            <li><Link to="/admin-login" className="hover:text-brand-500">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 Pune, Maharashtra, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@starterstation.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Starter Station. All rights reserved.
      </div>
    </footer>
  );
}