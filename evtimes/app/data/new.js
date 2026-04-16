export async function getNews() {
  try {
    const res = await fetch("http://localhost:3000/api/news");

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    console.log("NEWS:", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}