"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/app/data/comments";

type CommentItem = {
  id: number;
  body: string;
  postId: number;
  user?: {
    username?: string;
  };
};

function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase();
}

function getWordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export default function CommentsView() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftComment, setDraftComment] = useState("");

  useEffect(() => {
    let isMounted = true;

    getComments()
      .then((data) => {
        if (isMounted) {
          setComments(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Comments data load nahi ho paya.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const uniqueUsers = new Set(
    comments.map((item) => item.user?.username).filter(Boolean)
  ).size;

  const averageWords = comments.length
    ? Math.round(
        comments.reduce((sum, item) => sum + getWordCount(item.body), 0) /
          comments.length
      )
    : 0;
  const longestComment = comments.reduce(
    (max, item) => Math.max(max, getWordCount(item.body)),
    0
  );

  const handleEdit = (comment: CommentItem) => {
    setEditingId(comment.id);
    setDraftComment(comment.body);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraftComment("");
  };

  const handleSaveEdit = (id: number) => {
    const trimmedComment = draftComment.trim();

    if (!trimmedComment) {
      return;
    }

    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === id ? { ...comment, body: trimmedComment } : comment
      )
    );
    handleCancelEdit();
  };

  const handleDelete = (id: number) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== id)
    );

    if (editingId === id) {
      handleCancelEdit();
    }
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-subpage-hero">
        {/* <div>
          <p className="section-tag">Moderation Desk</p>
          <h1>Comments management dashboard</h1>
          <p>
            Comment activity, user engagement, and moderation flow now have a
            better dashboard-style view for admins.
          </p>
        </div> */}

        <div className="dashboard-summary-grid">
          <div className="dashboard-summary-card">
            <span>Total Comments</span>
            <strong>{comments.length}</strong>
            <small>Live moderation entries</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Unique Users</span>
            <strong>{uniqueUsers}</strong>
            <small>Distinct audience voices</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Average Words</span>
            <strong>{averageWords}</strong>
            <small>Average response length</small>
          </div>
          <div className="dashboard-summary-card">
            <span>Longest Comment</span>
            <strong>{longestComment}</strong>
            <small>Words in a single comment</small>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          </div>

        {loading ? (
          <div className="dashboard-empty-state">Loading comments...</div>
        ) : error ? (
          <div className="dashboard-empty-state">{error}</div>
        ) : (
          <div className="dashboard-table-shell">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Comment</th>
                  <th>Post ID</th>
                  <th>Length</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {comments.map((comment) => {
                  const username = comment.user?.username ?? `user-${comment.id}`;
                  const isEditing = editingId === comment.id;
                  const commentText = isEditing ? draftComment : comment.body;
                  const words = getWordCount(commentText);

                  return (
                    <tr key={comment.id}>
                      <td data-label="User">
                        <div className="dashboard-person-cell">
                          <span className="dashboard-person-avatar">
                            {getInitials(username)}
                          </span>
                          <div className="dashboard-person-meta">
                            <strong className="dashboard-table-title">{username}</strong>
                            <p>Community member</p>
                          </div>
                        </div>
                      </td>
                      <td data-label="Comment">
                        <div className="dashboard-comment-block">
                          {isEditing ? (
                            <textarea
                              value={draftComment}
                              onChange={(event) => setDraftComment(event.target.value)}
                              className="dashboard-comment-editor"
                              rows={4}
                            />
                          ) : (
                            <p className="dashboard-comment-copy">{comment.body}</p>
                          )}
                          <div className="dashboard-comment-meta">
                            <span>Comment #{comment.id}</span>
                            <span>{words} words</span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Post ID">
                        <span className="dashboard-inline-chip">Post #{comment.postId}</span>
                      </td>
                      <td data-label="Length">
                        <div className="dashboard-table-stack">
                          <span className="dashboard-badge status-review">
                            {words} words
                          </span>
                          <small>{isEditing ? "Currently editing" : "Ready to review"}</small>
                        </div>
                      </td>
                      <td data-label="Action">
                        <div className="dashboard-action-group">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                className="dashboard-action-button dashboard-action-save"
                                onClick={() => handleSaveEdit(comment.id)}
                                disabled={!draftComment.trim()}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="dashboard-action-button dashboard-action-cancel"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="dashboard-action-button dashboard-action-edit"
                                onClick={() => handleEdit(comment)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="dashboard-action-button dashboard-action-delete"
                                onClick={() => handleDelete(comment.id)}
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
        )}
      </section>
    </div>
  );
}
