"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/app/Component/Sidebar";
import Header from "@/app/Component/Header";

import "./dashboard.css";

const MOBILE_BREAKPOINT = 960;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [hasToken] = useState(() =>
    typeof window === "undefined"
      ? false
      : Boolean(window.localStorage.getItem("token"))
  );

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!hasToken) {
      router.replace("/login");
    }
  }, [hasToken, router]);

  /* ---------------- RESPONSIVE ---------------- */
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const syncViewport = (event?: MediaQueryListEvent) => {
      const matches = event?.matches ?? mediaQuery.matches;
      setIsMobileViewport(matches);

      if (matches) {
        setIsSidebarCollapsed(false);
      } else {
        setIsMobileSidebarOpen(false);
      }
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  /* ---------------- BODY SCROLL LOCK ---------------- */
  useEffect(() => {
    if (!isMobileViewport || !isMobileSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen, isMobileViewport]);

  /* ---------------- TOGGLE LOGIC ---------------- */
  const handleToggleSidebar = () => {
    if (isMobileViewport) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev); // 🔥 MAIN FIX
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div
      className={`dashboard-layout 
        ${isSidebarCollapsed ? "is-sidebar-collapsed" : ""} 
        ${isMobileSidebarOpen ? "is-mobile-sidebar-open" : ""}
      `}
    >
      {/* ✅ FIX ADDED HERE */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobileViewport}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onToggleCollapse={handleToggleSidebar}   // 🔥 THIS LINE FIXES EVERYTHING
      />

      <div className="dashboard-main">
        <Header
          isSidebarOpen={
            isMobileViewport
              ? isMobileSidebarOpen
              : !isSidebarCollapsed
          }
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}