import {
  createUser,
  findUserByEmail,
  findUserWithPassword,
  updateLastLogin,
  getAllUsers,
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

  // const existingUser = await findUserByEmail(email);
  // if (existingUser) {
  //   throw new Error("User already exists");
  // }

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

  return {
    message: "Login successful",
    token,
  };
};