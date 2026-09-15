import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { packages } from "../data/mockData";
import { addBooking, getCurrentCustomer } from "../utils/storage";

export default function Booking() {
  const navigate = useNavigate();
  const customer = getCurrentCustomer();

  const [form, setForm] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    eventType: "",
    eventDate: "",
    guests: "",
    packageId: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.eventType || !form.eventDate || !form.guests) {
      setError("Please fill all required fields.");
      return;
    }

    const booking = addBooking({
      customerId: customer?.id || null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      eventType: form.eventType,
      eventDate: form.eventDate,
      guests: Number(form.guests),
      packageId: form.packageId ? Number(form.packageId) : null,
      message: form.message,
    });

    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Book Your Event</h1>
        <p className="text-gray-300 mt-2">Tell us about your event and we'll take care of the rest</p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
          {error && (
            <p className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</p>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Select Event Type</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Corporate Event</option>
                <option>Anniversary</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
              <input
                type="number"
                min="1"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Package</label>
            <select
              name="packageId"
              value={form.packageId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">No package (custom order)</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ₹{p.price_per_person}/person
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Any special requests..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
          >
            Submit Booking
          </button>
        </form>
      </section>
    </div>
  );
}