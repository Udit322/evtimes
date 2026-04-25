import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET ="123456cdc"
export const authMiddleware = async (req, context, next) => {
  try {
    const token = req.cookies.get("token")?.value;
    
   

    //console.log("Token from cookies:", token); // debug


    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    context.user = decoded;

    return next(context);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
};