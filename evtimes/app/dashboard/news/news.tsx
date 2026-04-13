"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/app/data/new";

type NewsItem = {
  title?: string;
  publishedAt?: string;
  source?: {
    name?: string;
  };
  description?: string;
};

function formatDate(date?: string) {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getNews()
      .then((data) => {
        if (isMounted) {
          setNews(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("News data load nahi ho paya.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const uniqueSources = new Set(news.map((item) => item.source?.name).filter(Boolean))
    .size;
  const datedStories = news.filter((item) => item.publishedAt).length;

  return (
    <div className="dashboard-page">
      <section className="dashboard-subpage-hero">
        {/* <div>
          <p className="section-tag">News Desk</p>
          <h1>News management dashboard</h1>
          <p>
            Latest headlines, sources, and publishing dates are arranged in a
            cleaner responsive newsroom view for admin review.
          </p>
        </div> */}

        <div className="dashboard-summary-grid">
          <div className="dashboard-summary-card">
            <span>Total Stories</span>
            <strong>{news.length}</strong>
          </div>
          <div className="dashboard-summary-card">
            <span>Sources</span>
            <strong>{uniqueSources}</strong>
          </div>
          <div className="dashboard-summary-card">
            <span>Dated Stories</span>
            <strong>{datedStories}</strong>
          </div>
          <div className="dashboard-summary-card">
            <span>Feed Status</span>
            <strong>Live</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <p className="section-tag">News Table</p>
            <h2>Latest EV-related headlines</h2>
          </div>
          <span className="dashboard-chip">Live news feed</span>
        </div>

        {loading ? (
          <div className="dashboard-empty-state">Loading news...</div>
        ) : error ? (
          <div className="dashboard-empty-state">{error}</div>
        ) : (
          <div className="dashboard-table-shell">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Source</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {news.map((item, index) => (
                  <tr key={`${item.title ?? "story"}-${index}`}>
                    <td data-label="Title">
                      <div>
                        <strong className="dashboard-table-title">
                          {item.title ?? "Untitled story"}
                        </strong>
                        <p className="dashboard-comment-copy">
                          {item.description ?? "Description not available."}
                        </p>
                      </div>
                    </td>
                    <td data-label="Source">
                      <span className="dashboard-table-value">
                        {item.source?.name ?? "Unknown source"}
                      </span>
                    </td>
                    <td data-label="Date">
                      <span className="dashboard-badge status-admin">
                        {formatDate(item.publishedAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
