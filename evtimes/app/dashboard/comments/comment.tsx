"use client";

import { useEffect, useState } from "react";

type CommentItem = {
  id: string; 
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftComment, setDraftComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/fetchComments");

      const data = await res.json();

      if (!res.ok) throw new Error("Failed");

      const mapped = data.map((item: any) => ({
        id: item._id, // 🔥 IMPORTANT
        body: item.content || "No content",
        postId: item.news || "NA",
        user: {
          username: item.user || "User",
        },
      }));

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

  const handleSaveEdit = (id: string) => {
    if (!draftComment.trim()) return;

    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, body: draftComment } : c
      )
    );

    handleCancelEdit();
  };

  const handleDelete = async (commentId: string, newsId: string) => {
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
       const res = await fetch("/api/admin/deleteComment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ commentId, newsId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed ❌");
        return;
      }

      // ✅ UI UPDATE
      setComments((prev) => prev.filter((c) => c.id !== commentId));

    } catch (err) {
      console.error(err);
      alert("Delete error ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">All Comments</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-400">{error}</div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No comments found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase bg-gray-50">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Post</th>
                <th className="px-6 py-3">Words</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {comments.map((comment) => {
                const isEditing = editingId === comment.id;
                const text = isEditing ? draftComment : comment.body;

                return (
                  <tr key={comment.id} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold">
                          {getInitials(comment.user.username)}
                        </div>
                        <span className="text-gray-700 font-medium">
                          {comment.user.username}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {isEditing ? (
                        <textarea
                          value={draftComment}
                          onChange={(e) => setDraftComment(e.target.value)}
                          className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      ) : (
                        <span className="line-clamp-2">{text}</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      #{comment.postId}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {getWordCount(text)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-3">

                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(comment.id)}
                              className="bg-[#166534] hover:bg-[#14532d] text-white text-xs px-4 py-1.5 rounded-md border border-[#166534]"
                            >
                              Save
                            </button>

                            <button
                              onClick={handleCancelEdit}
                              className="border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs px-4 py-1.5 rounded-md"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(comment)}
                              className="border border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white text-xs px-4 py-1.5 rounded-md"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(comment.id, comment.postId)}
                              className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white text-xs px-4 py-1.5 rounded-md"
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