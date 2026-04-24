"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSessionUser } from "@/app/lib/mockAuth";
import Confirmation from "../Component/Confirmation";

type IconProps = {
  className?: string;
};
type NavItem = {
  href: string;
  label: string;
  icon: (props: IconProps) => ReactElement;
};
type NavSection = {
  label: string;
  items: NavItem[];
};
type SidebarProps = {
  isCollapsed: boolean;
  isMobile: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
};

function DashboardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 5.5h7v5H4v-5Zm9 0h7v13h-7v-13ZM4 12.5h7v6H4v-6Z"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}
function UsersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4.5 18a4.5 4.5 0 0 1 9 0M13.5 18a3.5 3.5 0 0 1 7 0"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}
function CommentsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 17.5 3.5 20V6.5A2.5 2.5 0 0 1 6 4h12A2.5 2.5 0 0 1 20.5 6.5v8A2.5 2.5 0 0 1 18 17H6Zm2-7h8M8 13h5"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}
function PostsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Zm3 4h6M9 12h6M9 15.5h3.5"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}
function NewsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 5h9a2 2 0 0 1 2 2v11a1 1 0 0 0 2 0V8M8 9h6M8 12.5h6M8 16h4M6 19h10"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}
function LogoutIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 7.5 18.5 12 14 16.5M18 12H8M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10"
        fill="none" stroke="currentColor"
        strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.8"
      />
    </svg>
  );
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: "transform 0.24s ease", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    ],
  },
  {
    label: "",
    items: [
      { href: "/dashboard/news", label: "News", icon: NewsIcon },
       { href: "/dashboard/posts", label: "Add Posts", icon: PostsIcon },
      { href: "/dashboard/comments", label: "Comments", icon: CommentsIcon },
      { href: "/dashboard/users", label: "Users", icon: UsersIcon },
    ],
  },
];

export default function Sidebar({
  isCollapsed,
  isMobile,
  isMobileOpen,
  onCloseMobile,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseMobile();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const handleNavigate = () => {
    if (isMobile) onCloseMobile();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout API failed", error);
    }

    clearSessionUser();
    onCloseMobile();
    router.push("/");
  };

  return (
    <>
      <button
        type="button"
        className={`dashboard-sidebar-overlay ${isMobileOpen ? "is-open" : ""}`}
        onClick={onCloseMobile}
        aria-label="Close sidebar"
      />

      <aside
        id="dashboard-sidebar"
        className={`dashboard-sidebar-shell ${isCollapsed ? "is-collapsed" : ""} ${isMobileOpen ? "is-mobile-open" : ""}`}
      >
        <div className="dashboard-sidebar">
          <div className="dashboard-sidebar-top">
            <div className="dashboard-sidebar-head">
              <div className="dashboard-sidebar-brand">
                <div className="dashboard-brand-mark">
                  <span className="dashboard-brand-mark-word">EVTimes</span>
                </div>
                <div className="dashboard-sidebar-brand-copy">
                  <h1>EV Times</h1>
                </div>
              </div>

              {!isMobile && (
                <button
                  type="button"
                  className="sidebar-collapse-btn"
                  onClick={onToggleCollapse}
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  <CollapseIcon collapsed={isCollapsed} />
                </button>
              )}

              {isMobile && (
                <button
                  type="button"
                  className="dashboard-sidebar-close"
                  onClick={onCloseMobile}
                  aria-label="Close sidebar"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>
          </div>

          <div className="dashboard-sidebar-sections">
            {navSections.map((section, index) => (
              <div key={`${section.label}-${index}`} className="dashboard-sidebar-section">
                {section.label ? (
                  <p className="dashboard-sidebar-label">{section.label}</p>
                ) : null}
                <nav className="dashboard-sidebar-nav">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`dashboard-sidebar-link ${active ? "is-active" : ""}`}
                        aria-current={active ? "page" : undefined}
                        onClick={handleNavigate}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <span className="dashboard-sidebar-link-icon">
                          <Icon />
                        </span>
                        <span className="dashboard-sidebar-link-copy">
                          <strong>{item.label}</strong>
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="dashboard-sidebar-footer">
            <button
              type="button"
              className="dashboard-logout-button"
              onClick={() => setShowConfirm(true)}
            >
              <LogoutIcon className="dashboard-logout-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <Confirmation
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={async () => {
          setShowConfirm(false);
          await handleLogout();
        }}
      />
    </>
  );
}
