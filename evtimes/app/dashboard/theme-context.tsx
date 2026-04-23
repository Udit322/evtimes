"use client";

import { createContext, useContext } from "react";

type DashboardTheme = "light" | "dark";

type DashboardThemeContextValue = {
  theme: DashboardTheme;
  toggleTheme: () => void;
};

const DashboardThemeContext = createContext<DashboardThemeContextValue | null>(null);

export function DashboardThemeProvider({
  value,
  children,
}: {
  value: DashboardThemeContextValue;
  children: React.ReactNode;
}) {
  return (
    <DashboardThemeContext.Provider value={value}>
      {children}
    </DashboardThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const context = useContext(DashboardThemeContext);

  if (!context) {
    throw new Error("useDashboardTheme must be used within DashboardThemeProvider");
  }

  return context;
}
