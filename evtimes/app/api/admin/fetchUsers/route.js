import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";

import { compose } from "@/server/middleware/compose";
import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";

import { fetchAllUsers } from "@/server/controller/auth.controller/auth.controller";

export const GET = compose(
  [authMiddleware, adminMiddleware],
  async (req, context) => {
    console.log("role:", context.user);
    
    try {
      await connectDB();

      const result = await fetchAllUsers();

      return NextResponse.json(result, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }
  }
);