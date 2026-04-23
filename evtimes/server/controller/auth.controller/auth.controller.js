import {
  createUser,
  findUserByEmail,
  findUserWithPassword,
  findUserById,
  findUserByName,
  updateLastLogin,
  getAllUsers,
  updateById,
  updatestatusById,
  updateRoleById,
 
} from "@/server/repository/UserRepository/user.repository";

import { hashPassword, comparePassword } from "@/server/utils/hash";
import { generateToken } from "@/server/utils/jwt";
import { validateEmail, validatePassword } from "@/server/utils/validator";

export const registerUser = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validatePassword(password)) {
    throw new Error("Weak password");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    message: "User registered successfully",
    user,
  };
};


export const updateProfileImage = async (userId, imageUrl) => {
  return await updateById(userId, {
    profileImage: imageUrl,
  });
};

//Update user status (active/blocked) 

export const updateUserStatus = async (userId, status) => {
  if (!["active", "blocked"].includes(status)) {
    throw new Error("Invalid status value");
  }

  return await updatestatusById(userId, {
    status,
  });
};

export const fetchAllUsers = async () => {
  const users = await getAllUsers();

  return {
    message: "Users fetched successfully",
    count: users.length,
    users,
  };
};


export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await findUserWithPassword(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.status === "blocked") {
    throw new Error("User is blocked");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  await updateLastLogin(user._id.toString());

  const token = generateToken(user._id.toString(), user.role);

  const { password: _, ...safeUser } = user;

// return {
//   message: "Login successful",
//   token,
//   user: safeUser,
// };

  return {
    message: "Login successful",
    token,
    //user
  };
};

export const updateUserRole = async (userId, role) => {

  if (!["user","staff","admin"].includes(role)) {
    throw new Error("Invalid role value");  

  } 
  return await updateRoleById(userId, {
    role,
  });
}

export const findUserByEmailHandler = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  } 
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  } 
  return user;
}


export const findUserByNameHandler = async (name) => {
  if (!name) {
    throw new Error("Name is required");
  } 
  const user = await findUserByName(name);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export const findUserByIdHandler = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
