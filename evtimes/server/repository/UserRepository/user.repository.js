import User from "@/server/model/UserModel/user.model";

export const createUser = async (data) => {
  return await User.create(data);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};


export const findUserWithPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const updateLastLogin = async (id) => {
  return await User.findByIdAndUpdate(id, {
    lastLogin: new Date(),
  });
};

export const addLikedNews = async (userId, newsId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { likedNews: newsId } },
    { new: true }
  );
};

export const addBookmark = async (userId, newsId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { bookmarks: newsId } },
    { new: true }
  );
};