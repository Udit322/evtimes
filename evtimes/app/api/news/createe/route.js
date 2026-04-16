import { createNewsHandler } from "@/server/controller/news.controller/news.controller";
import { verifyToken } from "@/server/utils/jwt";
import { connectDB } from "@/server/config/db";
// import {authMiddleware} from "@/server/middleware/auth.middleware";
// import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // const token = req.headers.get("authorization")?.split(" ")[1];
    
     const token = req.cookies.get("token")?.value;
    
    const decoded = verifyToken(token);

    // console.log("Decoded user:", decoded); // debug
    // console.log("Decoded user ID:", decoded.userId); // debug
    // console.log("Decoded user role:", decoded.role); // debug 

    const news = await createNewsHandler(body, decoded.userId, decoded.role);

    return Response.json({ message: "News created", news });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
} 

// export const POST = authMiddleware(async (req, context) => {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const news = await createNewsHandler(body, context.user.userId);

//     return NextResponse.json({ message: "News created", news });
//   }
//     catch (err) { 
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// });
