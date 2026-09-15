import { Link } from "react-router-dom";
import { menuItems, packages } from "../data/mockData";

export default function Home() {
  const featuredItems = menuItems.slice(0, 4);
  const featuredPackages = packages.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-brand-500">Starter Station</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Delicious food, flawless service — making every event unforgettable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 rounded-full font-semibold transition"
            >
              Book Your Event
            </Link>
            <Link
              to="/menu"
              className="px-8 py-3 bg-white/10 border border-white hover:bg-white hover:text-gray-900 rounded-full font-semibold transition"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="/images/why-catering.jpg"
          alt="Why choose us"
          className="rounded-2xl shadow-lg w-full h-96 object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-brand-600">Starter Station?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            With years of experience in catering for weddings, birthdays, and
            corporate events, we bring together the finest ingredients, skilled
            chefs, and dedicated staff to make your special day truly memorable.
          </p>
          <ul className="space-y-3">
            {[
              "Fresh, quality ingredients every time",
              "Customizable menus & packages",
              "Experienced chefs & professional staff",
              "On-time setup and hassle-free service",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <span className="text-brand-600 font-bold">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="bg-brand-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Dishes</h2>
            <p className="text-gray-600 mt-2">A taste of what we bring to your event</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-brand-600 font-bold mt-1">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="px-6 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Packages</h2>
          <p className="text-gray-600 mt-2">Choose a plan that fits your event</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-2xl p-8 hover:shadow-xl transition bg-white"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-brand-600 text-2xl font-extrabold mb-4">
                ₹{pkg.price_per_person}
                <span className="text-sm text-gray-500 font-normal">/person</span>
              </p>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-brand-600">✓</span>{inc}
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className="block text-center py-2.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-brand-600 transition"
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="relative py-24 text-center text-white"
        style={{
          backgroundImage: "url('/images/catering.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to plan your event?</h2>
          <p className="text-gray-200 mb-8">
            Let Starter Station handle the food while you enjoy the moment.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 bg-brand-600 hover:bg-brand-700 rounded-full font-semibold transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}