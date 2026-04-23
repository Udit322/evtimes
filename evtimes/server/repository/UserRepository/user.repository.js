import User from "@/server/model/UserModel/user.model";
import mongoose from "mongoose";
export const createUser = async (data) => {
  return await User.create(data);
};

export const getAllUsers = async () => {
  return await User.find().select("-password"); // excluding password
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByName = async (name) => {
  return await  User.findOne({  name });
}

export const findUserById = async (userId) => {
  return await User.findById(userId);
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

// Update user by ID
export const updateById = async (userId, updateData) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      
      {
        returnDocument: "after",    // return the updated document
        // new: true,          // return updated doc
        runValidators: true // apply schema validation
      }
      
    );
    // console.log("Update Data:", updateData);  Debug log for update data
    // console.log("Updated User:", updatedUser); Debug log for updated user

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;

  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatestatusById = async (userId, updateData) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set  
      : updateData }, 
      {
        returnDocument: "after",    // return the updated document
        runValidators: true // apply schema validation
      }
    ); 
    if (!updatedUser) {

      throw new Error("User not found");
    }
    //console.log("Updated User Status:", updatedUser); // Debug log for updated user status
    //console.log("Update Data for Status:", updateData); // Debug log for update data for status
    //console.log("User ID for Status Update:", userId); // Debug log for user ID for status update
    return updatedUser;

  } catch (error) {
    throw new Error(error.message);
  } };

export const updateRoleById = async (userId, updateData) => {
  try {
    // Validate ObjectId  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        returnDocument: "after",    // return the updated document
        runValidators: true // apply schema validation
      }
    );  
    if (!updatedUser) {
      throw new Error("User not found");
    }
    
     //console.log("Updated User Role:", updatedUser); // Debug log for updated user role
    // console.log("Update Data for Role:", updateData); // Debug log for update data for role
    // console.log("User ID for Role Update:", userId); // Debug log for user ID for role update
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  } 
 
};

export const deleteById = async (userId) => {
  try {
    // Validate ObjectId  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
