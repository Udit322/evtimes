"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/data/users";

type UserItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company?: {
    title?: string;
  };
};
function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatRole(role: string) {
  return role === "super_admin" ? "Super Admin" : "Admin";
}

export default function UsersView() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    getUsers()
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Users data load nahi ho paya.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const superAdmins = users.filter((item) => item.role === "super_admin").length;
  const admins = users.filter((item) => item.role === "admin").length;
  const companies = new Set(
    users.map((item) => item.company?.title).filter(Boolean)
  ).size;

  return (
    <div className="dashboard-page">
      <section className="dashboard-subpage-hero">
        <div>
          <p className="section-tag">Admin Directory</p>
          <h1>Admin and super admin management</h1>
          <p>
            Team roles, access levels, and company details are arranged in a
            cleaner professional layout for quick review.
          </p>
        </div>

        <div className="dashboard-summary-grid">
          <div className="dashboard-summary-card">
            <span>Total Admins</span>
            <strong>{users.length}</strong>
            <small>Active workspace members</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Super Admins</span>
            <strong>{superAdmins}</strong>
            <small>Highest access control</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Companies</span>
            <strong>{companies}</strong>
            <small>Mapped organizations</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Admins</span>
            <strong>{admins}</strong>
            <small>Operational dashboard users</small>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <p className="section-tag">User Table</p>
            <h2>Workspace access overview</h2>
          </div>
          <span className="dashboard-chip">Live role mapping</span>
        </div>

        {loading ? (
          <div className="dashboard-empty-state">Loading admin data...</div>
        ) : error ? (
          <div className="dashboard-empty-state">{error}</div>
        ) : (
          <div className="dashboard-table-shell">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-label="Name">
                      <div className="dashboard-person-cell">
                        <span className="dashboard-person-avatar">
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                        <div className="dashboard-person-meta">
                          <strong className="dashboard-table-title">
                            {user.firstName} {user.lastName}
                          </strong>
                          <p>ID #{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td data-label="Email">
                      <div className="dashboard-table-stack">
                        <span className="dashboard-table-value">{user.email}</span>
                        <small>Primary login email</small>
                      </div>
                    </td>
                    <td data-label="Company">
                      <span className="dashboard-inline-chip">
                        {user.company?.title ?? "Independent"}
                      </span>
                    </td>
                    <td data-label="Role">
                      <div className="dashboard-table-stack">
                        <span
                          className={`dashboard-badge ${
                            user.role === "super_admin"
                              ? "status-super-admin"
                              : "status-admin"
                          }`}
                        >
                          {formatRole(user.role)}
                        </span>
                        <small>
                          {user.role === "super_admin"
                            ? "Full workspace control"
                            : "Daily operations access"}
                        </small>
                      </div>
                    </td>
                    <td data-label="Status">
                      <div className="dashboard-table-stack">
                        <span className="dashboard-badge status-ready">Active</span>
                        <small>Verified member</small>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
