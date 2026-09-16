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

// ==========================================
// CART (plate-wise ordering)
// ==========================================
export const getCart = () => read("ss_cart", []);
export const saveCart = (cart) => write("ss_cart", cart);

export const addToCart = (menuItem, quantity = 1) => {
  const cart = getCart();
  const existing = cart.find((c) => c.menuItemId === menuItem.id);
  let updated;
  if (existing) {
    updated = cart.map((c) =>
      c.menuItemId === menuItem.id ? { ...c, quantity: c.quantity + quantity } : c
    );
  } else {
    updated = [
      ...cart,
      {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
        quantity,
      },
    ];
  }
  saveCart(updated);
  return updated;
};

export const updateCartQuantity = (menuItemId, quantity) => {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((c) => c.menuItemId !== menuItemId);
  } else {
    cart = cart.map((c) => (c.menuItemId === menuItemId ? { ...c, quantity } : c));
  }
  saveCart(cart);
  return cart;
};

export const removeFromCart = (menuItemId) => {
  const cart = getCart().filter((c) => c.menuItemId !== menuItemId);
  saveCart(cart);
  return cart;
};

export const clearCart = () => saveCart([]);

export const getCartCount = () => getCart().reduce((sum, c) => sum + c.quantity, 0);

const GST_RATE = 0.05; // 5%

export const getCartTotals = () => {
  const cart = getCart();
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const tax = Math.round(subtotal * GST_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
};

// ==========================================
// ORDERS (plate-wise restaurant orders)
// ==========================================
export const getOrders = () => read("ss_orders", []);
export const saveOrders = (list) => write("ss_orders", list);

export const placeOrder = ({ customerId, name, phone, orderType, tableNo }) => {
  const cart = getCart();
  if (cart.length === 0) {
    return { success: false, message: "Your cart is empty." };
  }
  if (orderType === "Dine-in" && !tableNo) {
    return { success: false, message: "Please enter a table number." };
  }

  const { subtotal, tax, total } = getCartTotals();

  const order = {
    id: Date.now(),
    customerId: customerId || null,
    name,
    phone,
    orderType, // "Dine-in" | "Takeaway"
    tableNo: orderType === "Dine-in" ? tableNo : null,
    items: cart.map((c) => ({
      menuItemId: c.menuItemId,
      itemName: c.name,
      price: c.price,
      quantity: c.quantity,
      lineTotal: Math.round(c.price * c.quantity * 100) / 100,
    })),
    subtotal,
    tax,
    total,
    status: "Pending", // Pending | Preparing | Served | Completed | Cancelled
    createdAt: new Date().toISOString(),
  };

  saveOrders([...getOrders(), order]);
  clearCart();
  return { success: true, order };
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(orders);
};

export const getOrdersByCustomerId = (customerId) =>
  getOrders().filter((o) => o.customerId === customerId);