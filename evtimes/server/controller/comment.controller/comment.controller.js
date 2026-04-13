import {
  createComment,
  getCommentsByNews,
  deleteComment,
  updateComment,
  toggleLike,
} from "@/server/repository/CommentsRepository/comment.repository";

// CREATE COMMENT
export const addComment = async (data) => {
  const { user, news, content, parentComment } = data;

  if (!user || !news || !content) {
    throw new Error("Missing required fields");
  }

  return await createComment({
    user,
    news,
    content,
    parentComment: parentComment || null,
  });
};

// GET COMMENTS
export const fetchComments = async (newsId) => {
  if (!newsId) throw new Error("News ID required");

  return await getCommentsByNews(newsId);
};

// DELETE
export const removeComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);

  if (!comment) throw new Error("Comment not found");

  if (comment.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return await deleteComment(commentId);
};

// UPDATE
export const editComment = async (commentId, userId, content) => {
  const comment = await getCommentById(commentId);

  if (!comment) throw new Error("Comment not found");

  if (comment.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return await updateComment(commentId, content);
};

// LIKE
export const likeComment = async (commentId, userId) => {
  return await toggleLike(commentId, userId);
};