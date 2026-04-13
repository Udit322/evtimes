"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/Component/Sidebar";
import Header from "@/app/Component/Header";

import "./dasboard.css";

const MOBILE_BREAKPOINT = 960;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const handleToggleSidebar = () => {
    if (isMobileViewport) {
      setIsMobileSidebarOpen((current) => !current);
      return;
    }

    setIsSidebarCollapsed((current) => !current);
  };

  return (
    <div
      className={`dashboard-layout ${isSidebarCollapsed ? "is-sidebar-collapsed" : ""} ${
        isMobileSidebarOpen ? "is-mobile-sidebar-open" : ""
      }`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobileViewport}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="dashboard-main">
        <Header
          isSidebarOpen={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
