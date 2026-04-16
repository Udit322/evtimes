"use client";

import { useState } from "react";

export default function PostNews() {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "", description: "", content: "",
    category: "", tags: "", image: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });

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

      const res = await fetch("/api/news/createe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg({ text: "✅ Article published!", type: "success" });

      setForm({
        title: "", description: "", content: "",
        category: "", tags: "", image: "",
      });

      setShowForm(false); // 🔥 CLOSE FORM AFTER SUCCESS

    } catch (err: any) {
      setMsg({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">News</h2>
          <p className="text-sm text-gray-500">Manage your articles</p>
        </div>

        {/* 🔥 ADD BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
        >
          + Add News
        </button>
      </div>

      {/* 🔥 MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 space-y-5">

            {/* TOP */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Create News</h3>
              <button onClick={() => setShowForm(false)}>❌</button>
            </div>

            {/* FORM */}
            <div className="space-y-4">

              <input name="title" value={form.title} onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 border rounded-lg" />

              <input name="description" value={form.description} onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded-lg" />

              <textarea name="content" value={form.content} onChange={handleChange}
                placeholder="Content"
                className="w-full p-3 border rounded-lg h-28" />

              <div className="grid grid-cols-2 gap-3">
                <input name="category" value={form.category} onChange={handleChange}
                  placeholder="Category"
                  className="p-3 border rounded-lg" />

                <input name="tags" value={form.tags} onChange={handleChange}
                  placeholder="Tags"
                  className="p-3 border rounded-lg" />
              </div>

              <input name="image" value={form.image} onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-3 border rounded-lg" />

            </div>

            {/* MESSAGE */}
            {msg.text && (
              <p className={`text-sm ${msg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {msg.text}
              </p>
            )}

            {/* ACTION */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                {loading ? "Posting..." : "Publish"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}