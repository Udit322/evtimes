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
  author?: string;
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

  const loadNews = async () => {
    try {
      const data = await getNews();
      console.log("NEWS:", data);
      setNews(data);
    } catch (err) {
      setError("News load nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const uniqueAuthors = new Set(news.map((item) => item.author)).size;
  const datedStories = news.filter((item) => item.createdAt).length;

  return (
    <div className="dashboard-page">
      <section className="dashboard-summary-grid">
        <div className="dashboard-summary-card">
          <span>Total Stories</span>
          <strong>{news.length}</strong>
        </div>
        <div className="dashboard-summary-card">
          <span>Authors</span>
          <strong>{uniqueAuthors}</strong>
        </div>
        <div className="dashboard-summary-card">
          <span>Dated Stories</span>
          <strong>{datedStories}</strong>
        </div>
      </section>

      <section className="dashboard-panel">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Author</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {news.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.author}</td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}