import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { menuItems } from "../data/mockData";
import { addToCart } from "../utils/storage";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = menuItems.find((i) => i.id === Number(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Item not found</h2>
        <button
          onClick={() => navigate("/menu")}
          className="mt-6 px-6 py-2.5 bg-brand-600 text-white rounded-full font-semibold"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const related = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(item, qty);
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/menu" className="text-brand-600 font-medium text-sm">
        ← Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-6">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-2xl shadow-lg w-full h-[420px] object-cover"
        />
        <div>
          <span className="text-sm text-brand-600 font-semibold uppercase">{item.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.name}</h1>
          <p className="text-gray-600 mt-4 leading-relaxed">{item.description}</p>
          <p className="text-3xl font-extrabold text-brand-600 mt-6">
            ₹{item.price} <span className="text-base text-gray-500 font-normal">/ plate</span>
          </p>

          <span
            className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
              item.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </span>

          {item.status === "Available" && (
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-700 mb-2">Number of plates</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-brand-600 text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-brand-600 text-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-500 text-sm">
                  Subtotal: <span className="font-semibold text-gray-900">₹{item.price * qty}</span>
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
                <Link
                  to="/booking"
                  className="px-8 py-3 border border-gray-300 hover:bg-gray-100 rounded-full font-semibold transition"
                >
                  Book for an Event Instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <Link
                to={`/item/${r.id}`}
                key={r.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img src={r.image} alt={r.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{r.name}</h3>
                  <p className="text-brand-600 font-bold mt-1">₹{r.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}