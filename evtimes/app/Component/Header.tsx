"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  showSidebarToggle: boolean;
  onToggleSidebar: () => void;
};

const headerNavItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

const pageMeta = [
  {
    match: (pathname: string) => pathname === "/dashboard",
    eyebrow: "Overview",
    title: "Dashboard",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/users"),
    eyebrow: "Workspace",
    title: "Users",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/comments"),
    eyebrow: "Moderation",
    title: "Comments",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/posts"),
    eyebrow: "Content",
    title: "Posts",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/news"),
    eyebrow: "Desk Feed",
    title: "News",
  },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M4 7h16M4 12h16M4 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function getPageDetails(pathname: string) {
  return pageMeta.find((item) => item.match(pathname)) ?? pageMeta[0];
}

function getInitials(name?: string, email?: string) {
  const source = name?.trim() || email?.trim() || "U";
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}

export default function Header({
  isSidebarOpen,
  isSidebarCollapsed,
  showSidebarToggle,
  onToggleSidebar,
}: HeaderProps) {
  const pathname = usePathname();
  const currentPage = getPageDetails(pathname);

  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <header className="dashboard-topbar flex items-center justify-between px-4">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button
            onClick={onToggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
          >
            <MenuIcon />
          </button>
        )}
        <div>
          <span className="text-xs text-gray-400">{currentPage.eyebrow}</span>
          <h2 className="text-sm font-semibold text-gray-900">{currentPage.title}</h2>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NAV LINKS */}
        <nav className="flex gap-3">
          {headerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${
                isActive(item.href)
                  ? "font-semibold text-green-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* PROFILE DROPDOWN */}
        {user && (
          <div ref={ref} className="relative">

            {/* Trigger button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition hover:bg-gray-50 active:scale-95"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
                {getInitials(user.name, user.email)}
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                {user.name}
              </span>
              {/* chevron */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100">

                {/* User info */}
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>

                <div className="mx-3 border-t border-gray-100" />

                {/* Links */}
                <div className="px-2 py-2 space-y-0.5">
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    My Profile
                  </Link>

                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Edit Profile
                  </Link>
                </div>

                <div className="mx-3 border-t border-gray-100" />

                {/* Logout */}
                <div className="px-2 py-2">
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
