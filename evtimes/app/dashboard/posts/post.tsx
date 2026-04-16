"use client";

import { useState } from "react";

export default function PostNews() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" | "" }>({
    text: "",
    type: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setMsg({ text: "Title and content are required.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMsg({ text: "", type: "" });

      const url = editId
        ? `/api/news/updatee/${editId}`
        : `/api/news/createe`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg({
        text: editId ? "✅ Updated successfully!" : "✅ Created successfully!",
        type: "success",
      });

      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        tags: "",
        image: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (err: any) {
      setMsg({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (news: any) => {
    setForm({
      title: news.title,
      description: news.description,
      content: news.content,
      category: news.category,
      tags: news.tags?.join(","),
      image: news.image,
    });

    setEditId(news._id);
    setShowForm(true);
  };

  // 🔥 Dummy (API se replace kar lena)
  const dummyNews = [
    {
      _id: "1",
      title: "Tesla EV Launch",
      description: "New EV in India",
      content: "Full content...",
      category: "EV",
      tags: ["tesla", "india"],
      image: "",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef5f1]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">News</h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({
              title: "",
              description: "",
              content: "",
              category: "",
              tags: "",
              image: "",
            });
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow hover:scale-[1.03] transition"
        >
          + Add News
        </button>
      </div>

      {/* NEWS LIST */}
      <div className="space-y-3">
        {dummyNews.map((item) => (
          <div
            key={item._id}
            className="bg-white/70 backdrop-blur-md p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition border border-gray-100"
          >
            <div>
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>

            <button
              onClick={() => handleEdit(item)}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/90 backdrop-blur-lg w-full max-w-2xl p-6 rounded-2xl shadow-xl space-y-4 border border-gray-100 animate-[fadeIn_0.2s_ease]">

            <h3 className="text-lg font-semibold text-gray-800">
              {editId ? "Update News" : "Create News"}
            </h3>

            {/* INPUTS */}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition"
            />

            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 h-28"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500"
              />

              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags"
                className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500"
              />
            </div>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500"
            />

            {/* MESSAGE */}
            {msg.text && (
              <p
                className={`text-sm ${
                  msg.type === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {msg.text}
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 hover:shadow-lg transition"
              >
                {loading
                  ? "Processing..."
                  : editId
                  ? "Update"
                  : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}