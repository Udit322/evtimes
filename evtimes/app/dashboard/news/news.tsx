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

  const uniqueAuthors = new Set(
    news.map((item) =>
      typeof item.author === "string" ? item.author : item.author?._id
    )
  ).size;

  const datedStories = news.filter((item) => item.createdAt).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total stories", value: news.length },
          { label: "Authors", value: uniqueAuthors },
          { label: "Dated stories", value: datedStories },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {card.label}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">All stories</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-400">{error}</div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No stories found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50">
                <th className="px-6 py-3 font-small w-[22%]">Title</th>
                <th className="px-6 py-3 font-medium w-[35%]">Content</th>
                <th className="px-6 py-3 font-medium w-[28%]">Author</th>
                <th className="px-6 py-3 font-medium w-[15%]">Date</th>
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
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {item.title || "No title"}
                      </span>
                      {item.category && (
                        <span className="mt-1 inline-block text-xs  text-green-500 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      )}
                    </td>

                    {/* CONTENT */}
                    <td className="px-6 py-4 text-gray-500 line-clamp-2">
                      {item.content?.slice(0, 80) || "No content"}
                      {item.content && item.content.length > 80 ? "..." : ""}
                    </td>

                    {/* AUTHOR */}
                    <td className="px-6 py-4">
                      {email ? (
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-gray-700 font-medium truncate">{email}</p>
                            {authorId && (
                              <p className="text-xs text-gray-400 font-mono truncate">
                                {authorId}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                          No author
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-gray-500 tabular-nums">
                      {formatDate(item.createdAt)}
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