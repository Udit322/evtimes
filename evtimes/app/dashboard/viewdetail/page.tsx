"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type NewsDetail = {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  category?: string;
  slug?: string;
  createdAt?: string;
  author?: {
    name?: string;
    email?: string;
    profileImage?: string;
  } | null;
};
function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",

  });
}

function getAuthorInitials(name?: string, email?: string) {
  const source = name?.trim() || email?.trim() || "User";

  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function ViewNews() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setError("News slug missing hai.");
      setLoading(false);
      return;
    }

    async function loadNewsDetail() {
      try {
        const response = await fetch(
          `/api/news/getSingleNews/${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok || !data?.news) {
          throw new Error(data?.error || "News detail load nahi hui.");
        }

        setNews(data.news);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadNewsDetail();
  }, [slug]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading news detail...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
        <Link href="/dashboard/news" className="mt-4 inline-block text-sm text-blue-600">
          Back to news list
        </Link>
      </div>
    );
  }

  if (!news) {
    return <p className="p-6 text-sm text-gray-500">No news found.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto w-full rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-green-600 font-semibold">
              News Detail
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 mt-2">
              {news.title || "Untitled news"}
            </h1>
          </div>

          <Link
            href="/dashboard/news"
            className="border px-4 py-2 rounded-xl text-sm text-gray-700"
          >
            Back
          </Link>
        </div>

        {/* Info */}
        <div className="mb-6 grid gap-3 bg-gray-50 p-4 rounded-2xl text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">Category</p>
            <p className="font-medium text-gray-800">{news.category || "-"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Author</p>
            <p className="font-medium text-gray-800">{news.author?.email || "-"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Date</p>
            <p className="font-medium text-gray-800">{formatDate(news.createdAt)}</p>
          </div>
        </div>

        {/* USER */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
            {getAuthorInitials(news.author?.name, news.author?.email)}
          </div>

          <div>
            <p className="text-sm font-semibold">{news.author?.name || "Unknown"}</p>
            <p className="text-xs text-gray-500">{news.author?.email}</p>
          </div>
        </div>

        {/* 🔥 SMALL IMAGE FIX */}
        {news.image ? (
          <img
            src={news.image}
            alt="news"
           className="w-full h-[10px] sm:h-[40px] md:h-[10px] rounded-xl  mb-1"
          />
        ) : null}

        {/* Description */}
        {news.description && (
          <p className="mb-5 bg-green-50 border border-green-100 p-4 rounded-xl text-sm text-gray-700">
            {news.description}
          </p>
        )}

        {/* Content */}
        <p className="text-gray-700 leading-7 whitespace-pre-line">
          {news.content || "No content"}
        </p>

      </div>
    </main>
  );
}