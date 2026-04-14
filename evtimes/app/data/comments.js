export async function getComments() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/comments/get?newsId=123", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    // 🔥 BACKEND → FRONTEND FORMAT CONVERT
    const formatted = data.map((item, index) => ({
      id: index + 1,
      body: item.content,
      postId: item.news,
      user: {
        username: item.user || "user",
      },
    }));

    console.log("FORMATTED:", formatted);

    return formatted;

  } catch (error) {
    console.log(error);
    return [];
  }
}