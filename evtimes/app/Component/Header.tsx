"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
function getPageDetails(pathname: string) {
  return pageMeta.find((item) => item.match(pathname)) ?? pageMeta[0];
}

export default function Header({
  isSidebarOpen,
  isSidebarCollapsed,
  showSidebarToggle,
  onToggleSidebar,
}: HeaderProps) {
  const pathname = usePathname();
  const currentPage = getPageDetails(pathname);
  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : href === "/dashboard"
        ? pathname === href
        : pathname.startsWith(href);

  const menuLabel = isSidebarOpen
    ? "Close menu"
    : isSidebarCollapsed
      ? "Expand sidebar"
      : "Collapse sidebar";
  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-left">
        {showSidebarToggle ? (
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
        ) : null}

        <div className="dashboard-topbar-title">
          <span>{currentPage.eyebrow}</span>
          <strong>{currentPage.title}</strong>
        </div>
      </div>

      <div className="dashboard-topbar-right">
        <nav className="dashboard-topbar-nav" aria-label="Dashboard navigation">
          {headerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-topbar-link ${isActive(item.href) ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
