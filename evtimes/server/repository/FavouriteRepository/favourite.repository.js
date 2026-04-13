import Favourite from "@/server/model/Favourite/favourite.model";
import News from "@/server/model/NewsModel/news.model";
import User from "@/server/model/UserModel/user.model";    
import mongoose from "mongoose";

const createFavourite = async (userId, newsId) => {
  const favourite = new Favourite({ userId, newsId });
  return await favourite.save();
};

const deleteFavourite = async (userId, newsId) => {
    
  //return await Favourite.deletebyId(id);
 return await favourite.deleteOne({ userId, newsId });
};

const getFavouritesByUserId = async (userId) => {
  
//    return await Favourite.find({
//     userId 
//   }).populate("newsId");

//return await Favourite.find({});

if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  return await Favourite.find({
    userId: new mongoose.Types.ObjectId(userId) 
  }).populate("newsId");


};

export { createFavourite, deleteFavourite, getFavouritesByUserId };