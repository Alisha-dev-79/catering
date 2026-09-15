import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../data/mockData";

export default function Menu() {
  const categories = ["All", ...new Set(menuItems.map((i) => i.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-gray-300 mt-2">Explore our wide range of delicious dishes</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No dishes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {item.status !== "Available" && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs text-brand-600 font-semibold uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-brand-600 font-bold mt-2">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}