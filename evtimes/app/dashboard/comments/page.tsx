"use client";
const comments = [
  { id: 1, text: "Great article!", user: "Nandni" },
  { id: 2, text: "Nice info", user: "Rahul" },
    { id: 3, text: "Very helpful", user: "Priya" },
    { id: 4, text: "Thanks for sharing", user: "Amit" },
    { id: 5, text: "Interesting read", user: "Sneha" }
];

export default function CommentsPage() {
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="bg-white p-4 rounded-2xl shadow">
          <p>{c.text}</p>
          <span className="text-green-300 text-sm">
            - {c.user}
          </span>
        </div>
      ))}
    </div>
  );
}