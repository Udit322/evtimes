import {
  createComment,
  getCommentsByNews,
  deleteComment,
  updateComment,
  toggleLike,
  getCommentById,
  getAllComments
} from "@/server/repository/CommentsRepository/comment.repository";

import { incrementCommentCount } from "@/server/repository/NewsRepository/news.repository";

// CREATE COMMENT
export const addComment = async (data) => {
  const { user, news, content, parentComment } = data;

  if (!user || !news || !content) {
    throw new Error("Missing required fields");
  }
    await incrementCommentCount(news); // Increment comment count in news document
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


//Fetch All Comments from db
export const fetchAllComments = async () => {
  return await getAllComments();
}


// DELETE
export const removeComment = async (commentId, user, newsId) => {
  const {userId,role} = user;

 const comment = await getCommentById(commentId);

  if (!comment) throw new Error("Comment not found");

  if( role === "super_admin"){
    return await deleteComment(commentId, newsId);
  }
 

  if (comment.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return await deleteComment(commentId, newsId);
 
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