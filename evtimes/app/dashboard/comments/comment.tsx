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

type RawCommentItem = {
  _id?: string;
  content?: string;
  news?: string;
  user?: string;
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

      const mapped = data.map((item: RawCommentItem) => ({
        id: item._id,
        body: item.content || "No content",
        postId: item.news || "NA",
        user: {
          username: item.user || "User",
        },
      }));

      setComments(mapped);
    } catch {
      setError("Comments load nahi ho paaye");
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
      prev.map((comment) =>
        comment.id === id ? { ...comment, body: draftComment } : comment
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
        alert(data.message || "Delete failed");
        return;
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Delete error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-gray-800">All Comments</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-400">{error}</div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No comments found</div>
        ) : (
          <>
            <div className="space-y-3 p-3 md:hidden">
              {comments.map((comment) => {
                const isEditing = editingId === comment.id;
                const text = isEditing ? draftComment : comment.body;

                return (
                  <article key={comment.id} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-600">
                          {getInitials(comment.user.username)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{comment.user.username}</p>
                          <p className="text-xs text-gray-400">Post #{comment.postId}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500">
                        {getWordCount(text)} words
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Comment
                      </p>
                      {isEditing ? (
                        <textarea
                          value={draftComment}
                          onChange={(e) => setDraftComment(e.target.value)}
                          className="min-h-[110px] w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-sm leading-6 text-gray-600">{text}</p>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="rounded-md border border-[#166534] bg-[#166534] px-4 py-2 text-xs text-white hover:bg-[#14532d]"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="rounded-md border border-gray-300 px-4 py-2 text-xs text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(comment)}
                            className="rounded-md border border-[#166534] px-4 py-2 text-xs text-[#166534] hover:bg-[#166534] hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id, comment.postId)}
                            className="rounded-md border border-red-400 px-4 py-2 text-xs text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[780px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400">
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
                      <tr key={comment.id} className="transition hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-600">
                              {getInitials(comment.user.username)}
                            </div>
                            <span className="font-medium text-gray-700">{comment.user.username}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {isEditing ? (
                            <textarea
                              value={draftComment}
                              onChange={(e) => setDraftComment(e.target.value)}
                              className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                          ) : (
                            <span className="line-clamp-2">{text}</span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-gray-500">#{comment.postId}</td>
                        <td className="px-6 py-4 text-gray-500">{getWordCount(text)}</td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => handleSaveEdit(comment.id)}
                                  className="rounded-md border border-[#166534] bg-[#166534] px-4 py-1.5 text-xs text-white hover:bg-[#14532d]"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="rounded-md border border-gray-300 px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(comment)}
                                  className="rounded-md border border-[#166534] px-4 py-1.5 text-xs text-[#166534] hover:bg-[#166534] hover:text-white"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(comment.id, comment.postId)}
                                  className="rounded-md border border-red-400 px-4 py-1.5 text-xs text-red-500 hover:bg-red-500 hover:text-white"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
