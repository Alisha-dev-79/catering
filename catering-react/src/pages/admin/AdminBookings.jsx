import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getBookings, updateBookingStatus } from "../../utils/storage";
import { packages } from "../../data/mockData";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState(getBookings());
  const [filter, setFilter] = useState("All");

  const refresh = () => setBookings(getBookings());

  const handleStatusChange = (id, status) => {
    updateBookingStatus(id, status);
    refresh();
  };

  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-500 mt-1">Manage all customer booking requests</p>
          </div>
          <div className="flex gap-2">
            {["All", "Pending", "Confirmed", "Cancelled"].map((f) => (
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

        <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const pkg = packages.find((p) => p.id === b.packageId);
                  return (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium text-gray-900">#{b.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{b.name}</p>
                        <p className="text-gray-400 text-xs">{b.email}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{b.eventType}</td>
                      <td className="py-3 px-4 text-gray-600">{b.eventDate}</td>
                      <td className="py-3 px-4 text-gray-600">{b.guests}</td>
                      <td className="py-3 px-4 text-gray-600">{pkg ? pkg.name : "Custom"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className="border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}