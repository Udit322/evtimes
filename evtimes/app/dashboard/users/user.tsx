"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/data/users";

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError("Users load nahi ho paaye "));
  }, []);

  const totalUsers = users.length;
  const superAdmins = users.filter(u => u.role === "super_admin").length;
  const normalUsers = users.filter(u => u.role === "user").length;
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Total Users</p>
          <h2 className="text-3xl font-bold">{totalUsers}</h2>
          <p className="text-gray-400 text-sm mt-2">
            Total registered users
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Super Admins</p>
          <h2 className="text-3xl font-bold">{superAdmins}</h2>
          <p className="text-gray-400 text-sm mt-2">
            Highest access users
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Normal Users</p>
          <h2 className="text-3xl font-bold">{normalUsers}</h2>
          <p className="text-gray-400 text-sm mt-2">
            Standard platform users
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-400 text-sm mb-2">System Status</p>
          <h2 className="text-3xl font-bold text-green-600">Active</h2>
          <p className="text-gray-400 text-sm mt-2">
            Platform running smoothly
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        {error && <p className="text-red-500">{error}</p>}

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-gray-500">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === "super_admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
 
    </div>
  );
}
