import { seedCustomers, ADMIN_CREDENTIALS } from "../data/mockData";

// ---------- Generic helpers ----------
const read = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ---------- Init (run once) ----------
export const initStorage = () => {
  if (!localStorage.getItem("ss_customers")) write("ss_customers", seedCustomers);
  if (!localStorage.getItem("ss_bookings")) write("ss_bookings", []);
  if (!localStorage.getItem("ss_payments")) write("ss_payments", []);
};

// ---------- Customers ----------
export const getCustomers = () => read("ss_customers", []);
export const saveCustomers = (list) => write("ss_customers", list);

export const registerCustomer = ({ name, email, phone, password }) => {
  const customers = getCustomers();
  if (customers.some((c) => c.email === email)) {
    return { success: false, message: "Email already registered." };
  }
  const newCustomer = { id: Date.now(), name, email, phone, password };
  saveCustomers([...customers, newCustomer]);
  return { success: true, customer: newCustomer };
};

export const loginCustomer = (email, password) => {
  const customers = getCustomers();
  const found = customers.find((c) => c.email === email && c.password === password);
  if (!found) return { success: false, message: "Invalid email or password." };
  write("ss_current_customer", found);
  return { success: true, customer: found };
};

export const getCurrentCustomer = () => read("ss_current_customer", null);
export const logoutCustomer = () => localStorage.removeItem("ss_current_customer");

// ---------- Admin ----------
export const loginAdmin = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem("ss_admin_logged_in", "true");
    return { success: true };
  }
  return { success: false, message: "Invalid admin credentials." };
};
export const isAdminLoggedIn = () => localStorage.getItem("ss_admin_logged_in") === "true";
export const logoutAdmin = () => localStorage.removeItem("ss_admin_logged_in");

// ---------- Bookings ----------
export const getBookings = () => read("ss_bookings", []);
export const saveBookings = (list) => write("ss_bookings", list);

export const addBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    id: Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...booking,
  };
  saveBookings([...bookings, newBooking]);
  return newBooking;
};

export const updateBookingStatus = (id, status) => {
  const bookings = getBookings().map((b) => (b.id === id ? { ...b, status } : b));
  saveBookings(bookings);
};

export const getBookingsByCustomerEmail = (email) =>
  getBookings().filter((b) => b.email === email);

// ---------- Payments ----------
export const getPayments = () => read("ss_payments", []);
export const savePayments = (list) => write("ss_payments", list);

export const addPayment = (payment) => {
  const payments = getPayments();
  const newPayment = {
    id: Date.now(),
    status: "Paid",
    createdAt: new Date().toISOString(),
    ...payment,
  };
  savePayments([...payments, newPayment]);
  return newPayment;
};