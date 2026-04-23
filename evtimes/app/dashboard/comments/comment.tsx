"use client";

import { useEffect, useState } from "react";

type CommentItem = {
  id: number;
  body: string;
  postId: string;
  user: {
    username: string;
  };
};

function getWordCount(text?: string) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function getInitials(username?: string) {
  if (!username) return "NA";
  return username.slice(0, 2).toUpperCase();
}

export default function CommentsView() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftComment, setDraftComment] = useState("");

  // 🔥 FINAL FETCH (WITH MAPPING)
  const fetchComments = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/fetchComments"
      );

      const data = await res.json();

      console.log("RAW 👉", data);

      if (!res.ok) throw new Error("Failed");

      // ✅ DIRECT ARRAY MAP
      const mapped = data.map((item: any, index: number) => ({
        id: index + 1,
        body: item.content || "No content",
        postId: item.news || "NA",
        user: {
          username: item.user || "User",
        },
      }));

      console.log("MAPPED 👉", mapped);

      setComments(mapped);

    } catch (err) {
      setError("Comments load nahi ho paaye ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEdit = (comment: CommentItem) => {
    setEditingId(comment.id);
    setDraftComment(comment.body);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraftComment("");
  };

  const handleSaveEdit = (id: number) => {
    if (!draftComment.trim()) return;

    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, body: draftComment } : c
      )
    );

    handleCancelEdit();
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : comments.length === 0 ? (
          <p>No comments found 🚫</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left ">Comment</th>
                <th className="p-3 text-left">Post</th>
                <th className="p-3 text-left">Words</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {comments.map((comment) => {
                const isEditing = editingId === comment.id;
                const text = isEditing ? draftComment : comment.body;

                return (
                  <tr key={comment.id} className="border-t">

                    <td className="p-3 flex gap-2 items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                        {getInitials(comment.user.username)}
                      </div>
                      {comment.user.username}
                    </td>

                    <td className="p-3">
                      {isEditing ? (
                        <textarea
                          value={draftComment}
                          onChange={(e) => setDraftComment(e.target.value)}
                          className="border p-2 w-full"
                        />
                      ) : (
                        text
                      )}
                    </td>

                    <td className="p-3">#{comment.postId}</td>

                    <td className="p-3">{getWordCount(text)}</td>
               <td className="p-4 text-right">
  <div className="inline-flex items-center gap-3">
    {isEditing ? (
      <>
        <button
          onClick={() => handleSaveEdit(comment.id)}
          className="bg-green-500 text-white px-2 py-1"
        >
          Save
        </button>
        <button
          onClick={handleCancelEdit}
          className="bg-gray-400 text-white px-2 py-1"
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => handleEdit(comment)}
          className="bg-green-500 text-white px-2 py-1"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(comment.id)}
          className="bg-green-500 text-white px-2 py-1"
        >
          Delete
        </button>
      </>
    )}
  </div>
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}