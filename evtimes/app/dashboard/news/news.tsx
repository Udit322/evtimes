"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNews } from "@/app/data/new";

type NewsItem = {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  image?: string;
  author?: string | { _id?: string; email?: string };
  createdAt?: string;
};

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB");
}

function getAuthorEmail(author: NewsItem["author"]) {
  if (!author) return null;
  if (typeof author === "string") return author;
  return author.email || null;
}

function getAuthorId(author: NewsItem["author"]) {
  if (!author || typeof author === "string") return null;
  return author._id || null;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNews()
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setError("News load nahi ho paya"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (newsId?: string) => {
    if (!newsId) return;

    const confirmDelete = confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/admin/deleteNews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsId }),
      });

      const data = await res.json();

      if (data.success) {
        setNews((prev) => prev.filter((item) => item._id !== newsId));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting news");
    }
  };

  const uniqueAuthors = new Set(
    news.map((item) => (typeof item.author === "string" ? item.author : item.author?._id))
  ).size;

  const datedStories = news.filter((item) => item.createdAt).length;

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total stories", value: news.length },
          { label: "Authors", value: uniqueAuthors },
          { label: "Dated stories", value: datedStories },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="mb-1 text-xs uppercase text-gray-400">{card.label}</p>
            <h2 className="text-2xl font-semibold text-gray-800">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-gray-800">All stories</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-400">{error}</div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No stories found</div>
        ) : (
          <>
            <div className="space-y-3 p-3 md:hidden">
              {news.map((item, index) => {
                const email = getAuthorEmail(item.author);
                const authorId = getAuthorId(item.author);

                return (
                  <article key={item._id || index} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800">{item.title || "No title"}</h3>
                        {item.category ? (
                          <span className="mt-1 inline-block text-xs text-green-500">{item.category}</span>
                        ) : null}
                      </div>

                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {item.content?.slice(0, 140) || "No content"}
                    </p>

                    <div className="mt-4 rounded-xl bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Author</p>
                      {email ? (
                        <div className="mt-1">
                          <p className="break-all text-sm font-medium text-gray-700">{email}</p>
                          {authorId ? <p className="mt-1 break-all text-xs text-gray-400">{authorId}</p> : null}
                        </div>
                      ) : (
                        <span className="mt-1 inline-block text-xs text-gray-400">No author</span>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={item.slug ? `/dashboard/viewdetail?slug=${encodeURIComponent(item.slug)}` : "#"}
                        className={`w-full rounded-md px-3 py-2 text-center text-xs text-white ${
                          item.slug ? "bg-blue-600" : "cursor-not-allowed bg-blue-300"
                        }`}
                        aria-disabled={!item.slug}
                        onClick={(event) => {
                          if (!item.slug) {
                            event.preventDefault();
                          }
                        }}
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="w-full rounded-md bg-[#166534] px-3 py-2 text-xs text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400">
                    <th className="w-[20%] px-6 py-3">Title</th>
                    <th className="w-[30%] px-6 py-3">Content</th>
                    <th className="w-[25%] px-6 py-3">Author</th>
                    <th className="w-[15%] px-6 py-3">Date</th>
                    <th className="w-[10%] px-6 py-3">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {news.map((item, index) => {
                    const email = getAuthorEmail(item.author);
                    const authorId = getAuthorId(item.author);

                    return (
                      <tr key={item._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">{item.title || "No title"}</span>
                          {item.category ? (
                            <span className="block text-xs text-green-500">{item.category}</span>
                          ) : null}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {item.content?.slice(0, 80) || "No content"}
                        </td>

                        <td className="px-6 py-4">
                          {email ? (
                            <div>
                              <p className="font-medium text-gray-700">{email}</p>
                              {authorId ? <p className="text-xs text-gray-400">{authorId}</p> : null}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No author</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-gray-500">{formatDate(item.createdAt)}</span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              href={item.slug ? `/dashboard/viewdetail?slug=${encodeURIComponent(item.slug)}` : "#"}
                              className={`rounded-md px-3 py-2 text-xs text-white ${
                                item.slug ? "bg-blue-600" : "cursor-not-allowed bg-blue-300"
                              }`}
                              aria-disabled={!item.slug}
                              onClick={(event) => {
                                if (!item.slug) {
                                  event.preventDefault();
                                }
                              }}
                            >
                              View
                            </Link>

                            <button
                              onClick={() => handleDelete(item._id)}
                              className="rounded-md bg-[#166534] px-3 py-2 text-xs text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
