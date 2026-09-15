import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { services as initialServices } from "../../data/mockData";

export default function AdminServices() {
  const [items, setItems] = useState(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    const newSvc = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      status: "Available",
    };
    setItems([newSvc, ...items]);
    setForm({ name: "", description: "", price: "" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: i.status === "Available" ? "Unavailable" : "Available" } : i)));
  };

  const deleteItem = (id) => {
    if (confirm("Delete this service?")) setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-500 mt-1">Manage add-on services</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-sm font-semibold transition"
          >
            {showForm ? "Cancel" : "+ Add Service"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow p-6 mt-6 grid md:grid-cols-2 gap-4">
            <input required name="name" placeholder="Service Name" value={form.name} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="px-4 py-2.5 border rounded-lg md:col-span-2" rows="2" />
            <button type="submit" className="md:col-span-2 py-2.5 bg-gray-900 text-white rounded-lg font-semibold">
              Save Service
            </button>
          </form>
        )}

        <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-b last:border-0">
                  <td className="py-3 px-4 font-medium text-gray-900">{s.name}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{s.description}</td>
                  <td className="py-3 px-4 text-gray-600">₹{s.price}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        s.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteItem(s.id)} className="text-red-600 text-xs font-semibold hover:underline">
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