import { Link } from "react-router-dom";
import { getCurrentCustomer, getBookingsByCustomerEmail } from "../utils/storage";
import { packages } from "../data/mockData";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function MyBooking() {
  const customer = getCurrentCustomer();
  const bookings = getBookingsByCustomerEmail(customer.email).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <p className="text-gray-300 mt-2">Welcome back, {customer.name}</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
            <Link
              to="/booking"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
            >
              Book Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => {
              const pkg = packages.find((p) => p.id === b.packageId);
              return (
                <div key={b.id} className="bg-white shadow rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">
                        {b.eventType} — #{b.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      📅 {b.eventDate} &nbsp;|&nbsp; 👥 {b.guests} guests
                      {pkg && <> &nbsp;|&nbsp; 📦 {pkg.name}</>}
                    </p>
                  </div>
                  <Link
                    to="/payment"
                    state={{ booking: b }}
                    className="px-6 py-2.5 border border-brand-600 text-brand-600 rounded-full font-semibold hover:bg-brand-600 hover:text-white transition text-center"
                  >
                    View / Pay
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}