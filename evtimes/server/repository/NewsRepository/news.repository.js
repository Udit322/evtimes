import News from "@/server/model/NewsModel/news.model";
import User from "@/server/model/UserModel/user.model"
// CREATE
export const createNews = async (data) => {
  return await News.create(data);
};

// GET ALL (with filters)
export const getAllNewswithFilters = async (filter = {}, options = {}) => {
  return await News.find(filter)
    .populate("author", "username email")
    .sort({ createdAt: -1 });
};

export const getAllNews = async () => {
  return await News.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 });
};


// GET BY SLUG
export const getNewsBySlug = async (slug) => {
  return await News.findOne({ slug })
    .populate("author", "username email");
};

// UPDATE
// export const updateNews = async (id, data) => {
//   return await News.findByIdAndUpdate(id, data, { new: true });
// };

//  UPDATE NEWS
export const updateNews = async (id, data) => {
  return await News.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,// running validators true to ensure data integrity
  });
};

// DELETE
export const deleteNews = async (newsId) => {
  return await News.findByIdAndDelete(newsId);
};

// INCREMENT VIEWS
export const incrementViews = async (id) => {
  return await News.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
};

// LIKE / UNLIKE
export const toggleLike = async (newsId, userId) => {
  const news = await News.findById(newsId);

  const alreadyLiked = news.likes.includes(userId);

  if (alreadyLiked) {
    news.likes.pull(userId);
  } else {
    news.likes.push(userId);
  }

  return await news.save();
};


export const changeNewsStatus = async (newsId, status, user) => {
  const existingNews = await News.findById(newsId);

  if (!existingNews) {
    throw new Error("News not found");
  }

  existingNews.status = status;
  return await existingNews.save();
};

//Increament comment count
export const incrementCommentCount = async (newsId) => {
  return await News.findByIdAndUpdate(  newsId,
    { $inc: { commentsCount: 1 } },
    { new: true }
  );
}

//Decreament comment count
export const decrementCommentCount = async (newsId) => {
  return await News.findByIdAndUpdate(  newsId,
    { $inc: { commentsCount: -1 } },
    { returnDocument: "after" }
  );
}