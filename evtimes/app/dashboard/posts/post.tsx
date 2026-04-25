"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getPosts } from "@/app/data/post";

type PostItem = {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[] | string;
  image?: string;
  status?: string;
};

function parseTags(tags: string[] | string | undefined): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag).replace(/[\[\]"']/g, "").trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) {
        return parsed.map((tag) => String(tag).trim()).filter(Boolean);
      }
    } catch { }

    return tags
      .replace(/[\[\]"']/g, "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

const CAT_COLORS: Record<string, string> = {
  vehicles: "bg-orange-50 text-orange-600 border-orange-200",
  technology: "bg-violet-50 text-violet-600 border-violet-200",
  sports: "bg-emerald-50 text-emerald-600 border-emerald-200",
  politics: "bg-red-50 text-red-600 border-red-200",
  business: "bg-blue-50 text-blue-600 border-blue-200",
  health: "bg-teal-50 text-teal-600 border-teal-200",
  default: "bg-slate-100 text-slate-600 border-slate-200",
};

const getCatColor = (cat?: string) =>
  CAT_COLORS[(cat || "").toLowerCase()] ?? CAT_COLORS.default;

export default function PostNews() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newsList, setNewsList] = useState<PostItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCatFilter] = useState("all");
  const [imageFilter, setImageFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      if (Array.isArray(data)) setNewsList(data);
      else if (Array.isArray(data.posts)) setNewsList(data.posts);
      else setNewsList([]);
    } catch {
      setNewsList([]);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files?.[0] || null);
  };
  const handleSubmit = async (status: "draft" | "published") => {
    if (!form.title.trim() || !form.description.trim() || !form.content.trim() || !form.category.trim()) {
      setMsg("Title, Description, Content and Category are required.");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      let imageUrl = form.image; // default (edit case)

      // ✅ STEP 1: upload image (if file selected)
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile); // 🔥 IMPORTANT

        const uploadRes = await fetch("/api/news/uploadCoverImage", {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed.");

        imageUrl = uploadData.url; // ✅ URL from your API
      }

      // ✅ STEP 2: create/update post
      const isEdit = Boolean(editId);

      const res = await fetch(
        isEdit ? `/api/news/updatee/${editId}` : "/api/news/createe",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...form,
            image: imageUrl, // 🔥 FINAL IMAGE URL
            status,
            tags: form.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg(
        status === "published"
          ? isEdit
            ? "Published successfully."
            : "Created and published."
          : isEdit
            ? "Draft updated."
            : "Draft saved."
      );

      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        tags: "",
        image: "",
      });

      setImageFile(null); // ✅ reset file
      setEditId(null);
      setShowForm(false);
      await loadPosts();
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (item: PostItem) => {
    setForm({
      title: item.title || "",
      description: item.description || "",
      content: item.content || "",
      category: item.category || "",
      tags: parseTags(item.tags).join(", "),
      image: item.image || "",
    });
    setEditId(item._id ?? null);
    setImageFile(null);
    setShowForm(true);
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      content: "",
      category: "",
      tags: "",
      image: "",
    });
    setImageFile(null);
    setMsg("");
    setShowForm(true);
  };

  const categories = Array.from(
    new Set(newsList.map((item) => item.category?.trim()).filter((value): value is string => Boolean(value)))
  );

  const filteredList = newsList.filter((item) => {
    const text = [item.title, item.description, item.category].filter(Boolean).join(" ").toLowerCase();
    const matchSearch = !searchTerm.trim() || text.includes(searchTerm.trim().toLowerCase());
    const matchCat = categoryFilter === "all" || item.category === categoryFilter;
    const hasImg = Boolean(item.image?.trim());
    const matchImg = imageFilter === "all" || (imageFilter === "with-image" ? hasImg : !hasImg);
    return matchSearch && matchCat && matchImg;
  });

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

  return (
    <>
      <style>{`
        .pn-root * { box-sizing: border-box; }
        .pn-root { font-family: 'DM Sans', sans-serif; }
        .pn-title { font-family: 'Syne', sans-serif; }
        .pn-card { transition: box-shadow .18s, transform .18s; }
        .pn-card:hover { box-shadow: 0 6px 28px rgba(79,70,229,.10); transform: translateY(-1px); }
        .pn-card-in { animation: pnIn .28s ease both; }
        @keyframes pnIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .pn-modal-bg { animation: pnFade .18s ease; }
        @keyframes pnFade { from{opacity:0} to{opacity:1} }
        .pn-modal { animation: pnSlide .22s cubic-bezier(.22,1,.36,1); }
        @keyframes pnSlide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .pn-btn-add { background: linear-gradient(135deg,#386641); }
        .pn-btn-publish { background: linear-gradient(135deg,#059669,#34d399); }
        .pn-btn-publish:hover { background: linear-gradient(135deg,#047857,#10b981); box-shadow:0 4px 16px rgba(5,150,105,.3); transform:translateY(-1px); }
        .pn-tag:hover { background:#e0e7ff; color:#4338ca; }
      `}</style>

      <div
        className="pn-root min-h-screen p-4 sm:p-6 md:p-8"
        style={{ background: "linear-gradient(135deg,#f8faff 0%,#ffffff 50%,#f5f3ff 100%)" }}
      >
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="pn-title mt-1 text-[2rem] font-extrabold leading-none text-slate-900">Posts</h2>
            <p className="mt-1.5 text-sm text-slate-400">
              {newsList.length} post{newsList.length !== 1 ? "s" : ""}
              {filteredList.length !== newsList.length && ` . ${filteredList.length} shown`}
            </p>
          </div>

          <button
            onClick={openAdd}
            className="pn-btn-add inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-95 sm:w-auto"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Post
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5 rounded-2xl border border-slate-100/80 bg-white p-4 shadow-sm">
          <select
            value={categoryFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="min-w-[140px] rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 max-sm:w-full"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={imageFilter}
            onChange={(e) => setImageFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 max-sm:w-full"
          >
            <option value="all">All Posts</option>
            <option value="with-image">With Image</option>
            <option value="no-image">No Image</option>
          </select>

          {(searchTerm || categoryFilter !== "all" || imageFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCatFilter("all");
                setImageFilter("all");
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-800 max-sm:w-full"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center">
              <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <svg width="32" height="32" fill="none" stroke="#94a3b8" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
                </svg>
              </div>
              <p className="pn-title text-base font-bold text-slate-600">No posts found</p>
              <p className="mt-1 text-sm text-slate-400">Adjust filters or add a new post.</p>
            </div>
          ) : (
            filteredList.map((item, index) => {
              const tags = parseTags(item.tags);

              return (
                <div
                  key={item._id || index}
                  className="pn-card pn-card-in flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center"
                  style={{ animationDelay: `${index * 35}ms` }}
                >
                  <div className="flex h-[180px] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-slate-100 to-slate-200 md:h-[78px] md:w-[78px]">
                    {item.image?.trim() ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title || "Post"} className="h-full w-full object-cover" />
                    ) : (
                      <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect width="18" height="18" x="3" y="3" rx="2.5" />
                        <path d="m3 9 18 0M9 21V9" />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="pn-title truncate text-[15px] font-bold text-slate-900">{item.title || "Untitled"}</h3>
                      {item.status ? (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${item.status === "published"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "border-amber-200 bg-amber-50 text-amber-500"
                            }`}
                        >
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-0.5 text-[13px] text-slate-500 md:truncate">
                      {item.description?.trim() || "No description"}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {item.category ? (
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getCatColor(item.category)}`}>
                          {item.category}
                        </span>
                      ) : null}

                      {tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="pn-tag cursor-default rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-500 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-1.5 font-mono text-[11px] tracking-tight text-slate-300">
                      /{item.title?.toLowerCase().replaceAll(" ", "-")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEdit(item)}
                    className="pn-edit-btn inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border bg-green-50 px-3.5 py-2 text-xs font-semibold text-green-600 active:scale-95 md:w-auto"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                    Edit
                  </button>
                </div>
              );
            })
          )}
        </div>

        {showForm ? (
          <div
            className="pn-modal-bg fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}
          >
            <div className="pn-modal w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div
                className="flex items-center justify-between border-b border-slate-100 px-6 py-5"
                style={{ background: "linear-gradient(135deg,#f8f9ff,#ffffff)" }}
              >
                <div>
                  <h3 className="pn-title text-lg font-extrabold text-slate-900">
                    {editId ? "Update Post" : "New Post"}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {editId ? "Make changes and save" : "Fill in details to publish"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setMsg("");
                  }}
                  className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[58vh] space-y-2.5 overflow-y-auto px-4 py-5 sm:px-6">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title *" className={inputCls} />
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short Description *"
                  className={inputCls}
                />

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <input name="category" value={form.category} onChange={handleChange} placeholder="Category *" className={inputCls} />
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="Tags (comma separated)"
                    className={inputCls}
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={inputCls}
                />
                {imageFile ? (
                  <p className="px-1 text-xs text-slate-500">
                    Selected image: {imageFile.name}
                  </p>
                ) : form.image ? (
                  <p className="px-1 text-xs text-slate-500">
                    Current image will be kept if you do not choose a new file.
                  </p>
                ) : null}
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Content *"
                  rows={4}
                  className={`${inputCls} resize-none`}
                />

                {msg ? (
                  <div
                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${msg.toLowerCase().includes("success") ||
                      msg.toLowerCase().includes("published") ||
                      msg.toLowerCase().includes("saved") ||
                      msg.toLowerCase().includes("created")
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-600"
                      }`}
                  >
                    {msg}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setMsg("");
                  }}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition-all hover:bg-slate-100 max-sm:w-full"
                >
                  Cancel
                </button>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => handleSubmit("draft")}
                    disabled={loading}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all active:scale-95 hover:bg-slate-50 disabled:opacity-50 max-sm:w-full"
                  >
                    {loading ? "Saving..." : editId ? "Update Draft" : "Save Draft"}
                  </button>
                  <button
                    onClick={() => handleSubmit("published")}
                    disabled={loading}
                    className="pn-btn-publish rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-md transition-all active:scale-95 disabled:opacity-50 max-sm:w-full"
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
