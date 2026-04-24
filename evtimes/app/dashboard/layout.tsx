"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" mt-16 flex min-h-screen bg-gray-100">

      {/* ✅ SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5">
        
        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link href="/dashboard" className="hover:text-green-600">
            Dashboard
          </Link>

          <Link href="/dashboard/news" className="hover:text-green-600">
            News
          </Link>

          <Link href="/dashboard/comments" className="hover:text-green-600">
            Comments
          </Link>

          <Link href="/dashboard/superadmin" className="hover:text-green-600">
            Super Admin
          </Link>

        </nav>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <main className=" mt-16 flex-1 p-6">
        {children}
      </main>

    </div>
  );
}
