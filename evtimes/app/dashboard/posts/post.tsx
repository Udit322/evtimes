"use client";

import { useState, useEffect, type ChangeEvent } from "react";
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

// ✅ Safely parse tags from any API format
function parseTags(tags: string[] | string | undefined): string[] {
    if (!tags) return [];
    if (Array.isArray(tags)) {
        return tags.map((t) => String(t).replace(/[\[\]"']/g, "").trim()).filter(Boolean);
    }
    if (typeof tags === "string") {
        try {
            const parsed = JSON.parse(tags);
            if (Array.isArray(parsed)) return parsed.map((t) => String(t).trim()).filter(Boolean);
        } catch {}
        return tags.replace(/[\[\]"']/g, "").split(",").map((t) => t.trim()).filter(Boolean);
    }
    return [];
}

const CAT_COLORS: Record<string, string> = {
    vehicles:   "bg-orange-50 text-orange-600 border-orange-200",
    technology: "bg-violet-50 text-violet-600 border-violet-200",
    sports:     "bg-emerald-50 text-emerald-600 border-emerald-200",
    politics:   "bg-red-50 text-red-600 border-red-200",
    business:   "bg-blue-50 text-blue-600 border-blue-200",
    health:     "bg-teal-50 text-teal-600 border-teal-200",
    default:    "bg-slate-100 text-slate-600 border-slate-200",
};
const getCatColor = (cat?: string) =>
    CAT_COLORS[(cat || "").toLowerCase()] ?? CAT_COLORS.default;

export default function PostNews() {
    const [showForm, setShowForm]       = useState(false);
    const [editId, setEditId]           = useState<string | null>(null);
    const [newsList, setNewsList]       = useState<PostItem[]>([]);
    const [searchTerm, setSearchTerm]   = useState("");
    const [categoryFilter, setCatFilter]= useState("all");
    const [imageFilter, setImageFilter] = useState("all");
    const [form, setForm] = useState({ title:"", description:"", content:"", category:"", tags:"", image:"" });
    const [loading, setLoading]         = useState(false);
    const [msg, setMsg]                 = useState("");

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            if (Array.isArray(data)) setNewsList(data);
            else if (Array.isArray(data.posts)) setNewsList(data.posts);
            else setNewsList([]);
        } catch { setNewsList([]); }
    };

    useEffect(() => { loadPosts(); }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (status: "draft" | "published") => {
        if (!form.title.trim() || !form.description.trim() || !form.content.trim() || !form.category.trim()) {
            setMsg("❌ Title, Description, Content & Category required."); return;
        }
        try {
            setLoading(true); setMsg("");
            const isEdit = !!editId;
            const res = await fetch(
                isEdit ? `/api/news/updatee/${editId}` : `/api/news/createe`,
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, status, tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean) }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMsg(status === "published"
                ? isEdit ? "✅ Published successfully." : "✅ Created & published!"
                : isEdit ? "✅ Draft updated." : "✅ Draft saved.");
            setForm({ title:"", description:"", content:"", category:"", tags:"", image:"" });
            setEditId(null); setShowForm(false);
            await loadPosts();
        } catch (err: unknown) {
            setMsg("❌ " + (err instanceof Error ? err.message : "Something went wrong."));
        } finally { setLoading(false); }
    };

    const handleEdit = (item: PostItem) => {
        setForm({
            title: item.title||"", description: item.description||"",
            content: item.content||"", category: item.category||"",
            tags: parseTags(item.tags).join(", "), image: item.image||"",
        });
        setEditId(item._id ?? null); setShowForm(true);
    };

    const openAdd = () => {
        setEditId(null);
        setForm({ title:"", description:"", content:"", category:"", tags:"", image:"" });
        setMsg(""); setShowForm(true);
    };

    const categories = Array.from(new Set(
        newsList.map(i => i.category?.trim()).filter((v): v is string => Boolean(v))
    ));

    const filteredList = newsList.filter(item => {
        const text = [item.title, item.description, item.category].filter(Boolean).join(" ").toLowerCase();
        const matchSearch = !searchTerm.trim() || text.includes(searchTerm.trim().toLowerCase());
        const matchCat = categoryFilter === "all" || item.category === categoryFilter;
        const hasImg = Boolean(item.image?.trim());
        const matchImg = imageFilter === "all" || (imageFilter === "with-image" ? hasImg : !hasImg);
        return matchSearch && matchCat && matchImg;
    });

    const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all";

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
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
                .pn-btn-add { background: linear-gradient(135deg,#4f46e5,#818cf8); }
                .pn-btn-add:hover { background: linear-gradient(135deg,#4338ca,#6366f1); box-shadow:0 4px 16px rgba(79,70,229,.35); transform:translateY(-1px); }
                .pn-btn-publish { background: linear-gradient(135deg,#059669,#34d399); }
                .pn-btn-publish:hover { background: linear-gradient(135deg,#047857,#10b981); box-shadow:0 4px 16px rgba(5,150,105,.3); transform:translateY(-1px); }
                .pn-tag:hover { background:#e0e7ff; color:#4338ca; }
                .pn-edit-btn { transition: all .15s; }
                .pn-edit-btn:hover { background:#ede9fe; border-color:#c4b5fd; color:#6d28d9; transform:translateY(-1px); }
            `}</style>

            <div className="pn-root min-h-screen p-6 md:p-8" style={{ background: "linear-gradient(135deg,#f8faff 0%,#ffffff 50%,#f5f3ff 100%)" }}>

                {/* ── HEADER ── */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        {/* <span className="pn-title inline-block text-[10px] font-black uppercase tracking-[.25em] text-indigo-400 mb-2 px-2.5 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                            Content Manager
                        </span> */}
                        <h2 className="pn-title text-[2rem] font-extrabold text-slate-900 leading-none mt-1">Posts</h2>
                        <p className="text-sm text-slate-400 mt-1.5">
                            {newsList.length} post{newsList.length !== 1 ? "s" : ""}
                            {filteredList.length !== newsList.length && ` · ${filteredList.length} shown`}
                        </p>
                    </div>
                    <button onClick={openAdd} className="pn-btn-add inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md shrink-0 transition-all active:scale-95">
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                        Add Post
                    </button>
                </div>

                {/* ── FILTERS ── */}
                <div className="mb-6 flex flex-wrap gap-2.5 rounded-2xl bg-white p-4 shadow-sm border border-slate-100/80">
                    {/* <div className="relative flex-1 min-w-[180px]">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search posts…"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all" />
                    </div> */}

                    <select value={categoryFilter} onChange={e => setCatFilter(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all min-w-[140px]">
                        <option value="all">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select value={imageFilter} onChange={e => setImageFilter(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all">
                        <option value="all">All Posts</option>
                        <option value="with-image">With Image</option>
                        <option value="no-image">No Image</option>
                    </select>

                    {(searchTerm || categoryFilter !== "all" || imageFilter !== "all") && (
                        <button onClick={() => { setSearchTerm(""); setCatFilter("all"); setImageFilter("all"); }}
                            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            Reset
                        </button>
                    )}
                </div>

                {/* ── LIST ── */}
                <div className="space-y-3">
                    {filteredList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center">
                            <div className="mb-4 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                                <svg width="32" height="32" fill="none" stroke="#94a3b8" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"/></svg>
                            </div>
                            <p className="pn-title text-base font-bold text-slate-600">No posts found</p>
                            <p className="text-sm text-slate-400 mt-1">Adjust filters or add a new post.</p>
                        </div>
                    ) : (
                        filteredList.map((item, i) => {
                            const tags = parseTags(item.tags);
                            return (
                                <div key={item._id || i} className="pn-card pn-card-in flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                                    style={{ animationDelay: `${i * 35}ms` }}>

                                    {/* Thumbnail */}
                                    <div className="h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-100">
                                        {item.image?.trim() ? (
                                            <img src={item.image} alt={item.title || "Post"} className="h-full w-full object-cover" />
                                        ) : (
                                            <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2.5"/><path d="m3 9 18 0M9 21V9"/></svg>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="pn-title text-[15px] font-bold text-slate-900 truncate">{item.title || "Untitled"}</h3>
                                            {item.status && (
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                                                    item.status === "published"
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                        : "bg-amber-50 text-amber-500 border-amber-200"
                                                }`}>{item.status}</span>
                                            )}
                                        </div>
                                        <p className="text-[13px] text-slate-500 truncate mt-0.5">{item.description?.trim() || "No description"}</p>
                                        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                            {item.category && (
                                                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCatColor(item.category)}`}>
                                                    {item.category}
                                                </span>
                                            )}
                                            {tags.map((tag, ti) => (
                                                <span key={ti} className="pn-tag text-[11px] bg-indigo-50 text-indigo-500 border border-indigo-100 px-2 py-0.5 rounded-full cursor-default transition-colors">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-[11px] text-slate-300 mt-1.5 font-mono tracking-tight">
                                            /{item.title?.toLowerCase().replaceAll(" ", "-")}
                                        </p>
                                    </div>

                                    {/* Edit button */}
                                    <button onClick={() => handleEdit(item)}
                                        className="pn-edit-btn shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-600 active:scale-95">
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                                        Edit
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* ── MODAL ── */}
                {showForm && (
                    <div className="pn-modal-bg fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
                        <div className="pn-modal bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100"
                                style={{ background: "linear-gradient(135deg,#f8f9ff,#ffffff)" }}>
                                <div>
                                    <h3 className="pn-title text-lg font-extrabold text-slate-900">
                                        {editId ? "Update Post" : "New Post"}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {editId ? "Make changes and save" : "Fill in details to publish"}
                                    </p>
                                </div>
                                <button onClick={() => { setShowForm(false); setMsg(""); }}
                                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5 space-y-2.5 max-h-[58vh] overflow-y-auto">
                                <input name="title" value={form.title} onChange={handleChange} placeholder="Title *" className={inputCls} />
                                <input name="description" value={form.description} onChange={handleChange} placeholder="Short Description *" className={inputCls} />
                                <div className="grid grid-cols-2 gap-2.5">
                                    <input name="category" value={form.category} onChange={handleChange} placeholder="Category *" className={inputCls} />
                                    <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className={inputCls} />
                                </div>
                                <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className={inputCls} />
                                <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content *" rows={4}
                                    className={`${inputCls} resize-none`} />

                                {msg && (
                                    <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium border ${
                                        msg.startsWith("✅") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
                                    }`}>{msg}</div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/70">
                                <button onClick={() => { setShowForm(false); setMsg(""); }}
                                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-all">
                                    Cancel
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => handleSubmit("draft")} disabled={loading}
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 shadow-sm transition-all active:scale-95">
                                        {loading ? "Saving…" : editId ? "Update Draft" : "Save Draft"}
                                    </button>
                                    <button onClick={() => handleSubmit("published")} disabled={loading}
                                        className="pn-btn-publish rounded-xl px-5 py-2 text-sm font-semibold text-white disabled:opacity-50 shadow-md transition-all active:scale-95">
                                        {loading ? "Publishing…" : "Publish"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}