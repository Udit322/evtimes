// app/lib/auth.js

// 🔹 Get current user from localStorage
export function getUser() {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
}

// 🔹 Login (set user with role)
export function login(role) {
    const user = {
        name: "Akshay",
        role: role, // "admin" or "superadmin"
    };
    localStorage.setItem("user", JSON.stringify(user));
}

// 🔹 Logout (remove user)
export function logout() {
    localStorage.removeItem("user");
}

// 🔹 Check Super Admin
export function isSuperAdmin(user) {
    return user?.role === "superadmin";
}

// 🔹 Check Admin
export function isAdmin(user) {
    return user?.role === "admin";
}