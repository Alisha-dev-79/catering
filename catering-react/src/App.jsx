import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { initStorage } from "./utils/storage";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import ItemDetails from "./pages/ItemDetails";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBooking from "./pages/MyBooking";
import Payment from "./pages/Payment";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminServices from "./pages/admin/AdminServices";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCustomers from "./pages/admin/AdminCustomers";

import Cart from "./pages/Cart";
import OrderBill from "./pages/OrderBill";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/admin/AdminOrders";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <PublicLayout>
              <Menu />
            </PublicLayout>
          }
        />
        <Route
          path="/item/:id"
          element={
            <PublicLayout>
              <ItemDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/packages"
          element={
            <PublicLayout>
              <Packages />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <PublicLayout>
              <Booking />
            </PublicLayout>
          }
        />
        <Route
          path="/confirmation"
          element={
            <PublicLayout>
              <Confirmation />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />
        <Route
          path="/order-bill"
          element={
            <PublicLayout>
              <OrderBill />
            </PublicLayout>
          }
        />

        {/* Customer protected */}
        <Route
          path="/my-booking"
          element={
            <PublicLayout>
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            </PublicLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <PublicLayout>
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            </PublicLayout>
          }
        />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookings />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-menu"
          element={
            <AdminProtectedRoute>
              <AdminMenu />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-packages"
          element={
            <AdminProtectedRoute>
              <AdminPackages />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-services"
          element={
            <AdminProtectedRoute>
              <AdminServices />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-payments"
          element={
            <AdminProtectedRoute>
              <AdminPayments />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-customers"
          element={
            <AdminProtectedRoute>
              <AdminCustomers />
            </AdminProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <div className="text-center py-32">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="text-gray-500 mt-2">Page not found</p>
              </div>
            </PublicLayout>
          }
        />

        <Route
          path="/my-orders"
          element={
            <PublicLayout>
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            </PublicLayout>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
