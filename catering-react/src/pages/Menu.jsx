import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../data/mockData";
import { addToCart } from "../utils/storage";

export default function Menu() {
  const categories = ["All", ...new Set(menuItems.map((i) => i.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({}); // { [itemId]: qty }
  const [toast, setToast] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getQty = (id) => quantities[id] || 1;

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const qty = getQty(item.id);
    addToCart(item, qty);
    window.dispatchEvent(new Event("cart-updated"));
    setToast(`${qty} plate${qty > 1 ? "s" : ""} of ${item.name} added to cart`);
    setTimeout(() => setToast(""), 2000);
    setQuantities((prev) => ({ ...prev, [item.id]: 1 })); // reset stepper
  };

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-gray-300 mt-2">Order plate-wise for dine-in or takeaway</p>
      </section>

      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

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
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group flex flex-col"
              >
                <Link to={`/item/${item.id}`} className="h-44 overflow-hidden relative block">
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
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/item/${item.id}`}>
                    <span className="text-xs text-brand-600 font-semibold uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1">{item.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-brand-600 font-bold mt-2">₹{item.price} / plate</p>

                  {item.status === "Available" && (
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {getQty(item.id)}
                        </span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-xs font-semibold transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}