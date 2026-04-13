import { connectDB } from "@/server/config/db";
import { NextResponse } from "next/server";
import { registerUser } from "@/server/controller/auth.controller/auth.controller";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const result = await registerUser(body);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}