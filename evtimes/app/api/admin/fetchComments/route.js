import { fetchAllComments } from "../../../../server/controller/comment.controller/comment.controller";
import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";
import { NextResponse } from "next/server";

export const GET = compose(
  [authMiddleware, adminMiddleware],
  async (req) => {
  
    try {
      const result = await fetchAllComments();
        return NextResponse.json(result, { status: 200 });

    } catch (err) {
      return NextResponse.json(
        { error: err.message },

        { status: 400 }
      );
    }   
    }
);