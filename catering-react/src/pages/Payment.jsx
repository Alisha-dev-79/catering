import { useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { addPayment } from "../utils/storage";
import { packages } from "../data/mockData";

export default function Payment() {
  const { state } = useLocation();
  const booking = state?.booking;
  const [method, setMethod] = useState("UPI");
  const [done, setDone] = useState(false);

  if (!booking) return <Navigate to="/my-booking" replace />;

  const pkg = packages.find((p) => p.id === booking.packageId);
  const amount = pkg ? pkg.price_per_person * booking.guests : 5000;

  const handlePay = () => {
    addPayment({
      bookingId: booking.id,
      amount,
      method,
      status: "Paid",
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          ₹{amount} paid via {method} for booking #{booking.id}.
        </p>
        <Link
          to="/my-booking"
          className="inline-block mt-8 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
        >
          Go to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h1>

        <div className="bg-brand-50 rounded-xl p-5 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-semibold">#{booking.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Event</span>
            <span className="font-semibold">{booking.eventType}</span>
          </div>
          {pkg && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Package</span>
              <span className="font-semibold">{pkg.name}</span>
            </div>
          )}
          <div className="flex justify-between text-base pt-2 border-t">
            <span className="font-semibold text-gray-700">Total Amount</span>
            <span className="font-bold text-brand-600">₹{amount}</span>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {["UPI", "Card", "Cash"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`py-2.5 rounded-lg text-sm font-semibold border transition ${
                method === m
                  ? "bg-brand-600 text-white border-brand-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={handlePay}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
        >
          Pay ₹{amount}
        </button>
      </div>
    </div>
  );
}