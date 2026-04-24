import { connectDB } from "@/server/config/db";
import { authMiddleware } from "@/server/middleware/auth.middleware";
import {
  findUserByIdHandler,
  updateUserProfile,
} from "@/server/controller/auth.controller/auth.controller";
import { NextResponse } from "next/server";

function toSafeUser(user) {
  return {
    id: user._id?.toString?.() || user.id || "",
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
    status: user.status || "active",
    isVerified: Boolean(user.isVerified),
    phone: user.phone || "",
    location: user.location || "",
    department: user.department || "",
    bio: user.bio || "",
    profileImage: user.profileImage || "",
  };
}

export const GET = async (req) => {
  const context = {};

  return authMiddleware(req, context, async () => {
    try {
      await connectDB();
      const user = await findUserByIdHandler(context.user.userId);

      return NextResponse.json({ user: toSafeUser(user) });
    } catch (error) {
      return NextResponse.json(
        { error: error.message || "Failed to fetch profile" },
        { status: 400 }
      );
    }
  });
};

export const PUT = async (req) => {
  const context = {};

  return authMiddleware(req, context, async () => {
    try {
      await connectDB();
      const body = await req.json();
      const user = await updateUserProfile(
        context.user.userId,
        body,
        context.user.role
      );

      return NextResponse.json({
        message: "Profile updated successfully",
        user: toSafeUser(user),
      });
    } catch (error) {
      return NextResponse.json(
        { error: error.message || "Failed to update profile" },
        { status: 400 }
      );
    }
  });
};
