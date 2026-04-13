import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { likeComment } from "@/server/controller/comment.controller/comment.controller";

export async function POST(req) {
  await connectDB();

  try {
    const { commentId, userId } = await req.json();

    const result = await likeComment(commentId, userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}