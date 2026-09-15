import { Link } from "react-router-dom";
import { packages } from "../data/mockData";

export default function Packages() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Packages</h1>
        <p className="text-gray-300 mt-2">Perfect plans for every occasion</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-2xl p-8 bg-white hover:shadow-xl transition flex flex-col"
            >
              <span className="text-xs font-semibold uppercase text-brand-600">
                {pkg.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{pkg.name}</h3>
              <p className="text-brand-600 text-3xl font-extrabold mt-3">
                ₹{pkg.price_per_person}
                <span className="text-sm text-gray-500 font-normal">/person</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Up to {pkg.max_guests} guests</p>

              <ul className="space-y-2 mt-6 flex-1">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-brand-600">✓</span>{inc}
                  </li>
                ))}
              </ul>

              <span
                className={`inline-block mt-4 w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                  pkg.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {pkg.status}
              </span>

              <Link
                to="/booking"
                className="block text-center mt-6 py-2.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-brand-600 transition"
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}