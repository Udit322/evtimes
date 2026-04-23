"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/app/data/new";

type NewsItem = {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[];
  image?: string;
  author?: string | { _id?: string; email?: string };
  createdAt?: string;
};

function formatDate(date?: string) {
  if (!date) return "—";
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
        // UI update
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
    news.map((item) =>
      typeof item.author === "string" ? item.author : item.author?._id
    )
  ).size;

  const datedStories = news.filter((item) => item.createdAt).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total stories", value: news.length },
          { label: "Authors", value: uniqueAuthors },
          { label: "Dated stories", value: datedStories },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <p className="text-xs text-gray-400 uppercase mb-1">
              {card.label}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            All stories
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-400">
            {error}
          </div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            No stories found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase bg-gray-50">
                <th className="px-6 py-3 w-[20%]">Title</th>
                <th className="px-6 py-3 w-[30%]">Content</th>
                <th className="px-6 py-3 w-[25%]">Author</th>
                <th className="px-6 py-3 w-[15%]">Date</th>
                <th className="px-6 py-3 w-[10%]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {news.map((item, index) => {
                const email = getAuthorEmail(item.author);
                const authorId = getAuthorId(item.author);
                const initials = email
                  ? email.slice(0, 2).toUpperCase()
                  : "NA";

                return (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50"
                  >
                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {item.title || "No title"}
                      </span>
                      {item.category && (
                        <span className="block text-xs text-green-500">
                          {item.category}
                        </span>
                      )}
                    </td>

                    {/* CONTENT */}
                    <td className="px-6 py-4 text-gray-500">
                      {item.content?.slice(0, 80) || "No content"}
                    </td>

                    {/* AUTHOR */}
                    <td className="px-6 py-4">
                      {email ? (
                        <div>
                          <p className="text-gray-700 font-medium">
                            {email}
                          </p>
                          {authorId && (
                            <p className="text-xs text-gray-400">
                              {authorId}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          No author
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                       className="bg-[#166534] text-white text-xs px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}