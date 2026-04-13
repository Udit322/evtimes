import { NextResponse } from "next/server";

export const parseBody = async (req, context) => {
  try {
    const body = await req.json();

    context.body = body;

    return context.next();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }
};