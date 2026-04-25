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
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

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

  const authorName = news.author?.name || "Unknown";
  const authorEmail = news.author?.email || "Email not available";
  const authorInitials = getAuthorInitials(news.author?.name, news.author?.email);

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
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-4">
          <button
            type="button"
            onClick={() => setIsAuthorModalOpen(true)}
            className="flex min-w-0 items-center gap-4 text-left"
          >
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-100 text-green-700 font-semibold">
              {news.author?.profileImage ? (
                <img
                  src={news.author.profileImage}
                  alt={authorName}
                  className="h-full w-full object-cover"
                />
              ) : (
                authorInitials
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{authorName}</p>
              <p className="truncate text-xs text-gray-500">{authorEmail}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthorModalOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-700 transition hover:bg-green-100"
            aria-label="Open author details"
            title="Open author details"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01" />
              <path d="M11 12h1v4h1" />
            </svg>
          </button>
        </div>

        {news.image ? (
          <div className="mx-auto mb-5 max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <img
              src={news.image}
              alt={news.title || "news"}
              className="h-[150px] w-full object-cover sm:h-[190px] md:h-[220px]"
            />
          </div>
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

      {isAuthorModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsAuthorModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-600">
                  Author Detail
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                  {authorName}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsAuthorModalOpen(false)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-green-100 text-lg font-semibold text-green-700">
                {news.author?.profileImage ? (
                  <img
                    src={news.author.profileImage}
                    alt={authorName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  authorInitials
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-gray-900">{authorName}</p>
                <p className="truncate text-sm text-gray-500">{authorEmail}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Name
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800">{authorName}</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Email
                </p>
                <p className="mt-2 break-all text-sm font-medium text-gray-800">{authorEmail}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
