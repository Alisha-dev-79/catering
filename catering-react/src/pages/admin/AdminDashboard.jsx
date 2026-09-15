import AdminSidebar from "../../components/AdminSidebar";
import { getBookings, getPayments, getCustomers } from "../../utils/storage";
import { menuItems, packages, services } from "../../data/mockData";

export default function AdminDashboard() {
  const bookings = getBookings();
  const payments = getPayments();
  const customers = getCustomers();

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: "📅", color: "bg-blue-100 text-blue-700" },
    { label: "Pending Bookings", value: pendingBookings, icon: "⏳", color: "bg-yellow-100 text-yellow-700" },
    { label: "Confirmed Bookings", value: confirmedBookings, icon: "✅", color: "bg-green-100 text-green-700" },
    { label: "Total Customers", value: customers.length, icon: "👥", color: "bg-purple-100 text-purple-700" },
    { label: "Menu Items", value: menuItems.length, icon: "🍽️", color: "bg-orange-100 text-orange-700" },
    { label: "Total Revenue", value: `₹${totalRevenue}`, icon: "💰", color: "bg-emerald-100 text-emerald-700" },
  ];

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of Starter Station operations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow mt-8 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Event</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Guests</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{b.name}</td>
                      <td className="py-3 pr-4 text-gray-600">{b.eventType}</td>
                      <td className="py-3 pr-4 text-gray-600">{b.eventDate}</td>
                      <td className="py-3 pr-4 text-gray-600">{b.guests}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm text-gray-500">
          <p>📦 {packages.length} packages configured</p>
          <p>🛎️ {services.length} services configured</p>
          <p>💳 {payments.length} payments recorded</p>
        </div>
      </main>
    </div>
  );
}