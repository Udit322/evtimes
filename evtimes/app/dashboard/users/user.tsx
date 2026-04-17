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

  // 🔥 get logged in user role
  useEffect(() => {
    const role = localStorage.getItem("role");
    setCurrentUserRole(role || "");
  }, []);

  // 🔥 CHANGE ROLE API
  const changeUserRole = async (userId: string, role: string) => {
    const res = await fetch("http://localhost:3000/api/admin/changeRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Role change failed");

    return data;
  };

  // 🔥 CHANGE STATUS API
  const changeUserStatus = async (userId: string, status: string) => {
    const res = await fetch("http://localhost:3000/api/admin/changeStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, status }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Status change failed");

    return data;
  };

  // 🔥 ROLE BUTTON CLICK
  const handleUpdateClick = async (userId: string) => {
    if (currentUserRole !== "super_admin") {
      return alert("Only Super Admin can change roles ❌");
    }

    const role = selectedRoles[userId];
    if (!role) return alert("Select role first ⚠️");

    try {
      await changeUserRole(userId, role);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, role } : u
        )
      );

      alert("Role updated ✅");
    } catch {
      alert("Role update failed ❌");
    }
  };

  // 🔥 STATUS BUTTON CLICK
  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    if (currentUserRole !== "super_admin") {
      return alert("Only Super Admin can change status ❌");
    }

    const newStatus = currentStatus === "active" ? "blocked" : "active";

    try {
      await changeUserStatus(userId, newStatus);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u
        )
      );

      alert("Status updated ✅");
    } catch {
      alert("Status update failed ❌");
    }
  };

  // 🔥 LOAD USERS
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);

        const roles: any = {};
        data.forEach((u: User) => {
          roles[u._id] = u.role;
        });
        setSelectedRoles(roles);
      })
      .catch(() => setError("Users load nahi ho paaye"));
  }, []);

  const totalUsers = users.length;
  const superAdmins = users.filter(u => u.role === "super_admin").length;
  const normalUsers = users.filter(u => u.role === "user").length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p>Total Users</p>
          <h2>{totalUsers}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p>Super Admins</p>
          <h2>{superAdmins}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p>Normal Users</p>
          <h2>{normalUsers}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p>Status</p>
          <h2 className="text-green-600">Active</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h2 className="mb-4">All Users</h2>

        {error && <p className="text-red-500">{error}</p>}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-400">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Change Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">

                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                {/* ROLE */}
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {user.role}
                  </span>
                </td>

                {/* STATUS BUTTON */}
                <td className="p-3">
                  <button
                    disabled={currentUserRole !== "super_admin"}
                    onClick={() => handleStatusToggle(user._id, user.status)}
                    className={`px-3 py-1 rounded-full text-xs text-white ${
                      user.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } ${
                      currentUserRole !== "super_admin" &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>

                {/* DROPDOWN */}
                <td className="p-3">
                  <select
                    value={selectedRoles[user._id]}
                    disabled={currentUserRole !== "super_admin"}
                    onChange={(e) =>
                      setSelectedRoles({
                        ...selectedRoles,
                        [user._id]: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>

                {/* UPDATE BUTTON */}
                <td className="p-3">
                  <button
                    disabled={currentUserRole !== "super_admin"}
                    onClick={() => handleUpdateClick(user._id)}
                    className={`px-3 py-1 rounded text-xs text-white ${
                      currentUserRole !== "super_admin"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
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