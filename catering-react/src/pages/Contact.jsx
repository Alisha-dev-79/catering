import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary: just log it, no backend yet
    console.log("Contact message:", form);
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-300 mt-2">We'd love to hear from you</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our menu, packages, or availability? Send us a
            message and our team will get back to you shortly.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-3"><span>📍</span> Pune, Maharashtra, India</li>
            <li className="flex gap-3"><span>📞</span> +91 98765 43210</li>
            <li className="flex gap-3"><span>✉️</span> hello@starterstation.com</li>
            <li className="flex gap-3"><span>🕐</span> Mon - Sun: 9:00 AM - 9:00 PM</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-5">
          {sent && (
            <p className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
              Message sent! We'll get back to you soon.
            </p>
          )}
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}