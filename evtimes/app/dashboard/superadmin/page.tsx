"use client";

import { useEffect, useState } from "react";

export default function SuperAdminPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  if (!role) return <p>Loading...</p>;

  if (role !== "superadmin") {
    return <h1 className="text-red-600 text-xl">❌ Access Denied</h1>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-6">👑 Super Admin Panel</h1>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Manage Admins</h2>
          <p className="text-sm text-gray-600">Add / Remove Admins</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-lg">System Control</h2>
          <p className="text-sm text-gray-600">Full system access</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-lg">Analytics</h2>
          <p className="text-sm text-gray-600">View full reports</p>
        </div>

      </div>
    </div>
  );
}
