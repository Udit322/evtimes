export async function getUsers() {
    const res = await fetch("https://dummyjson.com/users");

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await res.json();

    return (data.users ?? []).map((u, index) => ({
        ...u,
        role: index === 0 ? "super_admin" : "admin",
    }));
}
