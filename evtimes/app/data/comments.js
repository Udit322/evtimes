export async function getComments() {
  try {
    const res = await fetch("https://dummyjson.com/comments");

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    return data.comments; 
  } catch (error) {
    console.log(error);
    return [];
  }
}