import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { fetchComments } from "@/server/controller/comment.controller/comment.controller";

export async function POST(req) {
  await connectDB();

  try {
    const { newsId } = await req.json();

    const comments = await fetchComments(newsId);

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}