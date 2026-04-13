import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { addComment } from "@/server/controller/comment.controller/comment.controller";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const result = await addComment(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}