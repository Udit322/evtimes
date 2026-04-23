export async function getUsers() {


  const res = await fetch("http://localhost:3000/api/admin/fetchUsers", {
    method: "GET",
    headers: {
    
    },
  });

  const data = await res.json();

  console.log("API DATA 👉", data);

  if (!res.ok) {
    throw new Error("Failed ❌");
  }

  return data.users || [];
}
