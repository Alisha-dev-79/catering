import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { packages as initialPackages } from "../../data/mockData";

export default function AdminPackages() {
  const [items, setItems] = useState(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price_per_person: "", max_guests: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    const newPkg = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price_per_person: Number(form.price_per_person),
      max_guests: Number(form.max_guests),
      status: "Available",
      includes: [],
    };
    setItems([newPkg, ...items]);
    setForm({ name: "", category: "", price_per_person: "", max_guests: "" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: i.status === "Available" ? "Unavailable" : "Available" } : i)));
  };

  const deleteItem = (id) => {
    if (confirm("Delete this package?")) setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
            <p className="text-gray-500 mt-1">Manage catering packages</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-sm font-semibold transition"
          >
            {showForm ? "Cancel" : "+ Add Package"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow p-6 mt-6 grid md:grid-cols-2 gap-4">
            <input required name="name" placeholder="Package Name" value={form.name} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required name="category" placeholder="Category" value={form.category} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required type="number" name="price_per_person" placeholder="Price per person" value={form.price_per_person} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <input required type="number" name="max_guests" placeholder="Max guests" value={form.max_guests} onChange={handleChange} className="px-4 py-2.5 border rounded-lg" />
            <button type="submit" className="md:col-span-2 py-2.5 bg-gray-900 text-white rounded-lg font-semibold">
              Save Package
            </button>
          </form>
        )}

        <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price/Person</th>
                <th className="py-3 px-4">Max Guests</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
                  <td className="py-3 px-4 text-gray-600">{p.category}</td>
                  <td className="py-3 px-4 text-gray-600">₹{p.price_per_person}</td>
                  <td className="py-3 px-4 text-gray-600">{p.max_guests}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(p.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteItem(p.id)} className="text-red-600 text-xs font-semibold hover:underline">
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