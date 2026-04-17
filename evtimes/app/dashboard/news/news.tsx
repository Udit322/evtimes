"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getNews } from "@/app/data/new";

type NewsItem = {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[];
  image?: string;

  // 🔥 FIX: string OR object dono handle
  author?: string | {
    _id?: string;
    email?: string;
  };

  createdAt?: string;
};

function formatDate(date?: string) {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString("en-GB");
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOAD DATA
  const loadNews = async () => {
    try {
      const data = await getNews();
      console.log("NEWS:", data);

      setNews(Array.isArray(data) ? data : []);
    } catch {
      setError("News load nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // 🔥 FIXED AUTHOR COUNT
  const uniqueAuthors = new Set(
    news.map((item) =>
      typeof item.author === "string"
        ? item.author
        : item.author?._id
    )
  ).size;

  const datedStories = news.filter((item) => item.createdAt).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <span className="text-gray-500 text-sm">Total Stories</span>
          <h2 className="text-2xl font-bold">{news.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <span className="text-gray-500 text-sm">Authors</span>
          <h2 className="text-2xl font-bold">{uniqueAuthors}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <span className="text-gray-500 text-sm">Dated Stories</span>
          <h2 className="text-2xl font-bold">{datedStories}</h2>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : news.length === 0 ? (
          <div className="p-4 text-gray-500">No data found 🚫</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Content</th>
                <th className="p-3 text-left">Author ID</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {news.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    {item.title || "No Title"}
                  </td>

                  <td className="p-3">
                    {item.content?.slice(0, 50) || "No Content"}...
                  </td>

                  {/* 🔥 FINAL AUTHOR FIX */}
                  <td className="p-3 text-sm">
                    {item.author ? (
                      typeof item.author === "object" ? (
                        <div>
                          <p className="font-medium">
                            {item.author.email || "No Email"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.author._id}
                          </p>
                        </div>
                      ) : (
                        item.author
                      )
                    ) : (
                      "No Author"
                    )}
                  </td>

                  <td className="p-3">
                    {formatDate(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
