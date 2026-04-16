// ✅ GET COMMENTS
export async function getComments() {
  try {
    const res = await fetch("http://localhost:3000/api/comments/get");

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    // 🔥 format for your UI
    return (data.comments || []).map((item, index) => ({
      id: index + 1,
      body: item.content,
      postId: item.newsId,
      user: {
        username: item.user || "user",
      },
    }));

  } catch (error) {
    console.log("ERROR ❌", error);
    return [];
  }
}