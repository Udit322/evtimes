export async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/admin/fetchPosts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();

    console.log("✅ API RESPONSE:", data);

    // 🔥 handle both cases
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.posts)) return data.posts;

    return [];

  } catch (error) {
    console.log("❌ ERROR:", error);
    return [];
  }
}