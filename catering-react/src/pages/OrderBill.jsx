import { useLocation, Navigate, Link } from "react-router-dom";

export default function OrderBill() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/menu" replace />;

  const handlePrint = () => window.print();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-green-600">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-1">Your bill / receipt is below</p>
      </div>

      {/* Bill card */}
      <div id="bill" className="bg-white shadow-lg rounded-2xl p-8 print:shadow-none">
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-xl font-extrabold text-brand-600">
            Starter <span className="text-gray-900">Station</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Pune, Maharashtra, India</p>
          <p className="text-xs text-gray-500">+91 98765 43210</p>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <div>
            <p className="text-gray-500">Bill To</p>
            <p className="font-semibold text-gray-900">{order.name}</p>
            <p className="text-gray-600">{order.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Order #{order.id}</p>
            <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-gray-600">
              {order.orderType}
              {order.tableNo ? ` — Table ${order.tableNo}` : ""}
            </p>
          </div>
        </div>

        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2">Item</th>
              <th className="py-2 text-center">Plates</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.menuItemId} className="border-b last:border-0">
                <td className="py-2 text-gray-900">{it.itemName}</td>
                <td className="py-2 text-center text-gray-600">{it.quantity}</td>
                <td className="py-2 text-right text-gray-600">₹{it.price}</td>
                <td className="py-2 text-right font-medium text-gray-900">₹{it.lineTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-1 text-sm ml-auto w-48">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%)</span>
            <span>₹{order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t">
            <span>Grand Total</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center mt-6 pt-4 border-t">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            {order.status}
          </span>
          <p className="text-xs text-gray-400 mt-3">Thank you for ordering with Starter Station!</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-full font-semibold transition"
        >
          🖨️ Print Bill
        </button>
        <Link
          to="/menu"
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition"
        >
          Order More
        </Link>
      </div>
    </div>
  );
}