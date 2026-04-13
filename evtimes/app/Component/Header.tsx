"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";

type HeaderProps = {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onSearch?: (value: string) => void;
};

const headerNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/comments", label: "Comments" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/news", label: "News" },
];

const pageMeta = [
  {
    match: (pathname: string) => pathname === "/dashboard",
    eyebrow: "Overview",
    title: "Dashboard",
    searchLabel: "the dashboard",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/users"),
    eyebrow: "Workspace",
    title: "Users",
    searchLabel: "users",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/comments"),
    eyebrow: "Moderation",
    title: "Comments",
    searchLabel: "comments",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/posts"),
    eyebrow: "Content",
    title: "Posts",
    searchLabel: "posts",
  },
  {
    match: (pathname: string) => pathname.startsWith("/dashboard/news"),
    eyebrow: "Desk Feed",
    title: "News",
    searchLabel: "news",
  },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm8 2-3.8-3.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function getPageDetails(pathname: string) {
  return pageMeta.find((item) => item.match(pathname)) ?? pageMeta[0];
}

export default function Header({
  isSidebarOpen,
  isSidebarCollapsed,
  onToggleSidebar,
  onSearch,
}: HeaderProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const currentPage = getPageDetails(pathname);
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  const menuLabel = isSidebarOpen
    ? "Close menu"
    : isSidebarCollapsed
      ? "Expand sidebar"
      : "Collapse sidebar";

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-left">
        <button
          type="button"
          className={`dashboard-menu-button ${isSidebarCollapsed ? "is-collapsed" : ""}`}
          onClick={onToggleSidebar}
          aria-label={menuLabel}
          aria-controls="dashboard-sidebar"
          aria-expanded={isSidebarOpen}
        >
          <MenuIcon />
        </button>

        <div className="dashboard-topbar-title">
          <span>{currentPage.eyebrow}</span>
          <strong>{currentPage.title}</strong>
        </div>

        {/* <nav className="dashboard-topbar-nav" aria-label="Dashboard navigation">
          {headerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-topbar-link ${isActive(item.href) ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav> */}
      </div>

      <div className="dashboard-topbar-right">
        <label className="dashboard-topbar-search-shell" htmlFor="dashboard-search">
          <SearchIcon />
          <input
            id="dashboard-search"
            type="search"
            className="dashboard-topbar-search"
            placeholder={`Search ${currentPage.searchLabel}`}
            value={search}
            onChange={handleChange}
          />
        </label>
        {/* 
        <span className="dashboard-topbar-badge">
          <span className="dashboard-topbar-dot" />
          Live desk
        </span>

        <div className="dashboard-topbar-user">
          <span className="dashboard-topbar-user-avatar">ET</span>
          <div>
            <strong>EVTimes Admin</strong>
            <span>Control room</span>
          </div> */}
      </div>
      {/* </div> */}
    </header>
  );
}
