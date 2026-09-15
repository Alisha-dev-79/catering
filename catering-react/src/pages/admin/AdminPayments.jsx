import AdminSidebar from "../../components/AdminSidebar";
import { getPayments, getBookings } from "../../utils/storage";

export default function AdminPayments() {
  const payments = [...getPayments()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const bookings = getBookings();

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-500 mt-1">All recorded transactions</p>
          </div>
          <div className="bg-white rounded-2xl shadow px-6 py-4 text-right">
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-brand-600">₹{totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400">
                    No payments recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((p) => {
                  const booking = bookings.find((b) => b.id === p.bookingId);
                  return (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium text-gray-900">#{p.id}</td>
                      <td className="py-3 px-4 text-gray-600">#{p.bookingId}</td>
                      <td className="py-3 px-4 text-gray-600">{booking?.name || "—"}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">₹{p.amount}</td>
                      <td className="py-3 px-4 text-gray-600">{p.method}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {new Date(p.createdAt).toLocaleString()}
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