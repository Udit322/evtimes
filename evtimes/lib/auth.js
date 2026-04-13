import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};