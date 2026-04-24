import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "./component/navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>

        {/* ✅ Header MUST be inside body */}
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-2xl font-bold text-green-700">
            EVTIMES
          </h1>

          <Navbar />
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-green-700 text-white text-center p-4 mt-10">
          © 2026 EVTimes. All rights reserved.
        </footer>

      </body>
    </html>
  );
}
