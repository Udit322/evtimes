import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { addComment } from "@/server/controller/comment.controller/comment.controller";
// import { authMiddleware } from "@/server/middleware/auth.middleware";


export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const result = await addComment(body);

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "please log in!" },
        { status: 401 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// export const POST = authMiddleware(async (req, context) => {
//   await connectDB();    
//   try {
//     const body = await req.json();
//     const result = await addComment({ ...body, user: context.user.userId });
//     return NextResponse.json(result, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },   
//       { status: 400 }
//     );
//   }
// });

