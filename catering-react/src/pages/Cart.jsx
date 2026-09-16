import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartTotals,
  getCurrentCustomer,
  placeOrder,
} from "../utils/storage";

export default function Cart() {
  const navigate = useNavigate();
  const customer = getCurrentCustomer();
  const [cart, setCart] = useState(getCart());
  const [orderType, setOrderType] = useState("Dine-in");
  const [form, setForm] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
    tableNo: "",
  });
  const [error, setError] = useState("");

  const { subtotal, tax, total } = getCartTotals();

  const refresh = () => {
    setCart(getCart());
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleQtyChange = (menuItemId, delta, currentQty) => {
    updateCartQuantity(menuItemId, currentQty + delta);
    refresh();
  };

  const handleRemove = (menuItemId) => {
    removeFromCart(menuItemId);
    refresh();
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    const result = placeOrder({
      customerId: customer?.id || null,
      name: form.name,
      phone: form.phone,
      orderType,
      tableNo: form.tableNo,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    window.dispatchEvent(new Event("cart-updated"));
    navigate("/order-bill", { state: { order: result.order } });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500 mt-2">Add some delicious plates from our menu first.</p>
        <Link
          to="/menu"
          className="inline-block mt-8 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Your Cart</h1>
        <p className="text-gray-300 mt-2">Review your plates before placing the order</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((c) => (
            <div
              key={c.menuItemId}
              className="bg-white shadow rounded-2xl p-4 flex items-center gap-4"
            >
              <img src={c.image} alt={c.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{c.name}</h3>
                <p className="text-brand-600 font-bold text-sm mt-1">₹{c.price} / plate</p>
              </div>
              <div className="flex items-center border rounded-full">
                <button
                  onClick={() => handleQtyChange(c.menuItemId, -1, c.quantity)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{c.quantity}</span>
                <button
                  onClick={() => handleQtyChange(c.menuItemId, 1, c.quantity)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600"
                >
                  +
                </button>
              </div>
              <p className="w-20 text-right font-semibold text-gray-900">
                ₹{c.price * c.quantity}
              </p>
              <button
                onClick={() => handleRemove(c.menuItemId)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Checkout summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-3">
            {error && (
              <p className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{error}</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              {["Dine-in", "Takeaway"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`py-2 rounded-lg text-sm font-semibold border transition ${
                    orderType === t
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <input
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <input
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {orderType === "Dine-in" && (
              <input
                required
                placeholder="Table Number"
                value={form.tableNo}
                onChange={(e) => setForm({ ...form, tableNo: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
            >
              Place Order — ₹{total.toFixed(2)}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}