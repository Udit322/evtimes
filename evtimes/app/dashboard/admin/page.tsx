"use client";

import { getUser, isAdmin } from "@/app/lib/auth";

export default function AdminPage() {
    const user = getUser();

    // 🔒 Only Admin allowed
    if (!isAdmin(user)) {
        return <h1>Access Denied ❌</h1>;
    }

    return (
        <div>
            <h1>Admin Panel</h1>

            <ul>
                <li>Manage News</li>
                <li>Manage Comments</li>
                <li>View Dashboard Stats</li>
            </ul>
        </div>
    );
}