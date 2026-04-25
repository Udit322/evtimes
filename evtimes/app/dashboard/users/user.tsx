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

function getUserInitials(name: string, email: string) {
  const source = name?.trim() || email?.trim() || "User";

  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUserRole] = useState(() =>
    typeof window === "undefined" ? "" : window.localStorage.getItem("role") || ""
  );

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
    if (currentUserRole !== "super_admin") return alert("Only Super Admin can change roles");
    const role = selectedRoles[userId];
    if (!role) return alert("Select role first");

    try {
      await changeUserRole(userId, role);
      setUsers((prev) => prev.map((user) => (user._id === userId ? { ...user, role } : user)));
      alert("Role updated");
    } catch {
      alert("Role update failed");
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    if (currentUserRole !== "super_admin") return alert("Only Super Admin can change status");

    const newStatus = currentStatus === "active" ? "blocked" : "active";

    try {
      await changeUserStatus(userId, newStatus);
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, status: newStatus } : user))
      );
      alert("Status updated");
    } catch {
      alert("Status update failed");
    }
  };

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        const roles: Record<string, string> = {};
        data.forEach((user: User) => {
          roles[user._id] = user.role;
        });
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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Users", value: users.length },
          { label: "Super Admins", value: users.filter((user) => user.role === "super_admin").length },
          { label: "Normal Users", value: users.filter((user) => user.role === "user").length },
          { label: "Status", value: "Active", green: true },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="mb-1 text-sm text-gray-400">{card.label}</p>
            <h2 className={`text-2xl font-semibold ${card.green ? "text-green-500" : "text-gray-800"}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-gray-800">All Users</h2>
        </div>

        {error ? <p className="px-6 py-3 text-sm text-red-500">{error}</p> : null}

        <div className="space-y-3 p-3 md:hidden">
          {users.map((user) => (
            <article key={user._id} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800">{user.name}</h3>
                  <p className="mt-1 break-all text-xs text-gray-500">{user.email}</p>
                </div>
                <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${roleBadgeClass(user.role)}`}>
                  {user.role}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Status</p>
                  <button
                    disabled={!isSuperAdmin}
                    onClick={() => handleStatusToggle(user._id, user.status)}
                    className={`w-full rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    } ${!isSuperAdmin ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  >
                    {user.status}
                  </button>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Change Role
                  </p>
                  <select
                    value={selectedRoles[user._id]}
                    disabled={!isSuperAdmin}
                    onChange={(e) => setSelectedRoles({ ...selectedRoles, [user._id]: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <button
                disabled={!isSuperAdmin}
                onClick={() => handleUpdateClick(user._id)}
                className={`mt-4 w-full rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                  isSuperAdmin
                    ? "bg-green-700 text-white hover:bg-green-600"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                Update
              </button>

              <button
                onClick={() => setSelectedUser(user)}
                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
              >
                View Detail
              </button>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[920px] text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
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
                <tr key={user._id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>

                  <td className="px-6 py-4">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${roleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      disabled={!isSuperAdmin}
                      onClick={() => handleStatusToggle(user._id, user.status)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      } ${!isSuperAdmin ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                      {user.status}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={selectedRoles[user._id]}
                      disabled={!isSuperAdmin}
                      onChange={(e) => setSelectedRoles({ ...selectedRoles, [user._id]: e.target.value })}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-medium text-white transition-colors "
                      >
                        View Detail
                      </button>

                      <button
                        disabled={!isSuperAdmin}
                        onClick={() => handleUpdateClick(user._id)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                          isSuperAdmin
                            ? "bg-green-700 text-white hover:bg-green-600"
                            : "cursor-not-allowed bg-gray-100 text-gray-400"
                        }`}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  User Detail
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">{selectedUser.name}</h3>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                {getUserInitials(selectedUser.name, selectedUser.email)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-gray-900">{selectedUser.name}</p>
                <p className="truncate text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Email</p>
                <p className="mt-2 break-all text-sm font-medium text-gray-800">{selectedUser.email}</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Role</p>
                <p className="mt-2 text-sm font-medium text-gray-800">{selectedUser.role}</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Status</p>
                <p className="mt-2 text-sm font-medium text-gray-800">{selectedUser.status}</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">User ID</p>
                <p className="mt-2 break-all text-sm font-medium text-gray-800">{selectedUser._id}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
