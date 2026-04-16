import Comment from "@/server/model/CommentsModel/comment.model";
import User from "@/server/model/UserModel/user.model";

// CREATE
export const createComment = async (data) => {
  return await Comment.create(data);
};

// GET COMMENTS BY NEWS (with nested support later)
export const getCommentsByNews = async (newsId) => {
  return await Comment.find({ news: newsId })
    .populate("user", "username")
    .sort({ createdAt: -1 });
};

// GET SINGLE COMMENT
export const getCommentById = async (id) => {
  return await Comment.findById(id);
};

// DELETE COMMENT
export const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

// UPDATE COMMENT
export const updateComment = async (id, content) => {
  return await Comment.findByIdAndUpdate(
    id,
    { content, isEdited: true },
    { new: true }
  );
};

// LIKE / UNLIKE
export const toggleLike = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) throw new Error("Comment not found");

  const isLiked = comment.likes.includes(userId);

  if (isLiked) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await comment.save();
  return comment;
};

export const getAllComments = async () => {
  return await Comment.find().populate("user", "username").sort({ createdAt: -1 });
}