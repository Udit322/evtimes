import {
  addLikedNews,
  addBookmark,
} from "@/server/repository/UserRepository/user.repository";


export const likeNews = async (userId, newsId) => {
  if (!userId || !newsId) {
    throw new Error("UserId and NewsId required");
  }

  return await addLikedNews(userId, newsId);
};


export const bookmarkNews = async (userId, newsId) => {
  if (!userId || !newsId) {
    throw new Error("UserId and NewsId required");
  }

  return await addBookmark(userId, newsId);
};