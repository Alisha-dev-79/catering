import { Link, useLocation, Navigate } from "react-router-dom";
import { packages } from "../data/mockData";

export default function Confirmation() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <Navigate to="/booking" replace />;

  const pkg = packages.find((p) => p.id === booking.packageId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl text-green-600">✓</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
      <p className="text-gray-600 mt-2">
        Thank you, {booking.name}. Your booking request has been received.
      </p>

      <div className="bg-white shadow-lg rounded-2xl mt-10 p-8 text-left space-y-3">
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500">Booking ID</span>
          <span className="font-semibold text-gray-900">#{booking.id}</span>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500">Event Type</span>
          <span className="font-semibold text-gray-900">{booking.eventType}</span>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500">Event Date</span>
          <span className="font-semibold text-gray-900">{booking.eventDate}</span>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500">Guests</span>
          <span className="font-semibold text-gray-900">{booking.guests}</span>
        </div>
        {pkg && (
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Package</span>
            <span className="font-semibold text-gray-900">{pkg.name}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold text-yellow-600">{booking.status}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Link
          to="/payment"
          state={{ booking }}
          className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
        >
          Proceed to Payment
        </Link>
        <Link
          to="/"
          className="px-8 py-3 border border-gray-300 hover:bg-gray-100 rounded-full font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}