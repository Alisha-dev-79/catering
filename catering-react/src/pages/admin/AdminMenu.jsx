import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { menuItems as initialMenuItems } from "../../data/mockData";

export default function AdminMenu() {
  const [items, setItems] = useState(initialMenuItems);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "", image: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      image: form.image || "/images/hero.jpg",
      status: "Available",
    };
    setItems([newItem, ...items]);
    setForm({ name: "", category: "", price: "", description: "", image: "" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, status: i.status === "Available" ? "Unavailable" : "Available" } : i
      )
    );
  };

  const deleteItem = (id) => {
    if (confirm("Delete this menu item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Menu Items</h1>
            <p className="text-gray-500 mt-1">Manage dishes ({items.length} total) — frontend only, not saved yet</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-sm font-semibold transition"
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow p-6 mt-6 grid md:grid-cols-2 gap-4">
            <input required name="name" placeholder="Item Name" value={form.name} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required name="category" placeholder="Category" value={form.category} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input name="image" placeholder="Image path e.g. /images/biryani.jpg" value={form.image} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="px-4 py-2.5 border rounded-lg md:col-span-2" rows="2" />
            <button type="submit" className="md:col-span-2 py-2.5 bg-gray-900 text-white rounded-lg font-semibold">
              Save Item
            </button>
          </form>
        )}

        <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-2 px-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-2 px-4 text-gray-600">{item.category}</td>
                  <td className="py-2 px-4 text-gray-600">₹{item.price}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => deleteItem(item.id)} className="text-red-600 text-xs font-semibold hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}