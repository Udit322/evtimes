"use client";

import { getUser, isSuperAdmin } from "@/app/lib/auth";

export default function SuperAdminPage() {
    const user = getUser();

    // 🔒 Only Super Admin allowed
    if (!isSuperAdmin(user)) {
        return <h1>Access Denied ❌</h1>;
    }

    return (
        <div>
            <h1>Super Admin Panel</h1>

            <ul>
                <li>Manage Users</li>
                <li>Add / Remove Admins</li>
                <li>System Settings</li>
                <li>Full Dashboard Access</li>
            </ul>
        </div>
    );
}