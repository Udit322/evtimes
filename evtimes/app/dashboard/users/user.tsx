"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/data/users";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>({});
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setCurrentUserRole(role || "");
  }, []);

  const changeUserRole = async (userId: string, role: string) => {
    const res = await fetch("http://localhost:3000/api/admin/changeRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (!res.ok) throw new Error("Role change failed");
    return res.json();
  };

  const changeUserStatus = async (userId: string, status: string) => {
    const res = await fetch("http://localhost:3000/api/admin/changeStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status }),
    });
    if (!res.ok) throw new Error("Status change failed");
    return res.json();
  };

  const handleUpdateClick = async (userId: string) => {
    if (currentUserRole !== "super_admin") return alert("Only Super Admin can change roles ❌");
    const role = selectedRoles[userId];
    if (!role) return alert("Select role first ⚠️");
    try {
      await changeUserRole(userId, role);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role } : u)));
      alert("Role updated ✅");
    } catch {
      alert("Role update failed ❌");
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    if (currentUserRole !== "super_admin") return alert("Only Super Admin can change status ❌");
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await changeUserStatus(userId, newStatus);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u)));
      alert("Status updated ✅");
    } catch {
      alert("Status update failed ❌");
    }
  };
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        const roles: Record<string, string> = {};
        data.forEach((u: User) => { roles[u._id] = u.role; });
        setSelectedRoles(roles);
      })
      .catch(() => setError("Users load nahi ho paaye"));
  }, []);

  const isSuperAdmin = currentUserRole === "super_admin";

  const roleBadgeClass = (role: string) => {
    if (role === "super_admin") return "bg-indigo-100 text-indigo-700";
    if (role === "staff") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: users.length },
          { label: "Super Admins", value: users.filter(u => u.role === "super_admin").length },
          { label: "Normal Users", value: users.filter(u => u.role === "user").length },
          { label: "Status", value: "Active", green: true },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <h2 className={`text-2xl font-semibold ${card.green ? "text-green-500" : "text-gray-800"}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">All Users</h2>
        </div>

        {error && <p className="text-red-500 px-6 py-3 text-sm">{error}</p>}

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Change Role</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>

                {/* ROLE BADGE */}
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${roleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>

                {/* STATUS TOGGLE */}
                <td className="px-6 py-4">
                  <button
                    disabled={!isSuperAdmin}
                    onClick={() => handleStatusToggle(user._id, user.status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    } ${!isSuperAdmin ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {user.status}
                  </button>
                </td>

                {/* ROLE DROPDOWN */}
                <td className="px-6 py-4">
                  <select
                    value={selectedRoles[user._id]}
                    disabled={!isSuperAdmin}
                    onChange={(e) => setSelectedRoles({ ...selectedRoles, [user._id]: e.target.value })}
                    className="border border-gray-200 px-2 py-1.5 rounded-lg text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>

                {/* UPDATE BUTTON */}
                <td className="px-6 py-4">
                  <button
                    disabled={!isSuperAdmin}
                    onClick={() => handleUpdateClick(user._id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSuperAdmin
                        ? "bg-green-700 hover:bg-green 500 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}