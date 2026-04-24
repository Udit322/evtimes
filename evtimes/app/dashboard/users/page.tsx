const users = [
  { id: 1, name: "Nandni", email: "nandni@gmail.com" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com" },
  { id: 3, name: "Priya", email: "priya@gmail.com" },
  { id: 4, name: "Amit", email: "amit@gmail.com" },
  { id: 5, name: "Sneha", email: "sneha@gmail.com" }
];

export default function UsersPage() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <table className="w-full">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="text-left py-2">Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-green-50">
              <td className="py-2">{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}