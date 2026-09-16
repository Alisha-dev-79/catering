import { Link } from "react-router-dom";
import { getCurrentCustomer, getOrdersByCustomerId } from "../utils/storage";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Served: "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function MyOrders() {
  const customer = getCurrentCustomer();
  const orders = getOrdersByCustomerId(customer.id).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <p className="text-gray-300 mt-2">Your restaurant order history</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Link
              to="/menu"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o.id} className="bg-white shadow rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">Order #{o.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </div>
                  <Link
                    to="/order-bill"
                    state={{ order: o }}
                    className="text-brand-600 text-sm font-semibold hover:underline"
                  >
                    View Bill →
                  </Link>
                </div>
                <p className="text-gray-500 text-sm">
                  {o.orderType}
                  {o.tableNo ? ` — Table ${o.tableNo}` : ""} &nbsp;|&nbsp;{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {o.items.map((it) => `${it.itemName} × ${it.quantity}`).join(", ")}
                </p>
                <p className="font-bold text-brand-600 mt-3">Total: ₹{o.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}