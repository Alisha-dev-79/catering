import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getOrders, updateOrderStatus } from "../../utils/storage";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Served: "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(
    [...getOrders()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const refresh = () =>
    setOrders([...getOrders()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Orders</h1>
            <p className="text-gray-500 mt-1">
              Plate-wise dine-in / takeaway orders — {orders.length} total, ₹{totalRevenue.toFixed(2)} revenue
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Preparing", "Served", "Completed", "Cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === f ? "bg-brand-600 text-white" : "bg-white text-gray-600 border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
              No orders found.
            </div>
          ) : (
            filtered.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl shadow overflow-hidden">
                <div
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">Order #{o.id}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {o.name} · {o.phone} · {o.orderType}
                      {o.tableNo ? ` (Table ${o.tableNo})` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-bold text-brand-600">₹{o.total.toFixed(2)}</p>
                    <select
                      value={o.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(o.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Served">Served</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {expanded === o.id && (
                  <div className="border-t bg-gray-50 p-5">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="py-2">Item</th>
                          <th className="py-2 text-center">Plates</th>
                          <th className="py-2 text-right">Price</th>
                          <th className="py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {o.items.map((it) => (
                          <tr key={it.menuItemId} className="border-b last:border-0">
                            <td className="py-2 text-gray-900">{it.itemName}</td>
                            <td className="py-2 text-center text-gray-600">{it.quantity}</td>
                            <td className="py-2 text-right text-gray-600">₹{it.price}</td>
                            <td className="py-2 text-right font-medium text-gray-900">₹{it.lineTotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-end mt-3 text-sm space-x-6 text-gray-600">
                      <span>Subtotal: ₹{o.subtotal.toFixed(2)}</span>
                      <span>GST: ₹{o.tax.toFixed(2)}</span>
                      <span className="font-bold text-gray-900">Total: ₹{o.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}