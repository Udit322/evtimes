import { NextResponse } from "next/server";
import { likeNews } from "@/server/controller/user.controller";
import { authMiddleware } from "@/server/middleware/auth.middleware";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, newsId } = body;

    
    const user = authMiddleware(req);
    const userId = user.userId;

   
     const result = await likeNews(userId, newsId);
      return NextResponse.json({
        message: "News liked",
        data: result,
      });
    

   
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}