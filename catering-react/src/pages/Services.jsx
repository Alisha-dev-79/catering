import { Link } from "react-router-dom";
import { services } from "../data/mockData";

export default function Services() {
  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-gray-300 mt-2">Add-ons to elevate your event</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="border rounded-2xl p-8 bg-white hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-900">{svc.name}</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {svc.description}
              </p>
              <p className="text-brand-600 text-2xl font-extrabold mt-4">
                ₹{svc.price}
              </p>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  svc.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {svc.status}
              </span>
              <Link
                to="/booking"
                className="block text-center mt-6 py-2.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-brand-600 transition"
              >
                Add to Booking
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}