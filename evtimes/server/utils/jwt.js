import jwt from "jsonwebtoken";

const JWT_SECRET = "123456cdc";

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token,"123456cdc" );
    return decoded; // { userId, role, iat, exp }
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};