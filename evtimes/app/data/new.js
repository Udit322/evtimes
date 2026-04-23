export async function getNews() {
  try {
    const res = await fetch("http://localhost:3000/api/admin/fetchNews", {
      cache: "no-store", // 🔥 important for fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();

    console.log("NEWS:", data);

    // 🔥 ensure array return
    return Array.isArray(data) ? data : data.news || [];
    
  } catch (error) {
    console.log("Fetch Error:", error);
    return [];
  }
}