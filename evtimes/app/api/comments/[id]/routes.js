import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import {
  editComment,
  removeComment,
} from "@/server/controller/comment.controller/comment.controller";

// UPDATE
export async function PUT(req, { params }) {
  await connectDB();

  try {
    const { id } =await  params;
    const { userId, content } = await req.json();

    const updated = await editComment(id, userId, content);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// DELETE
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const { userId } = await req.json();

    await removeComment(id, userId);

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

