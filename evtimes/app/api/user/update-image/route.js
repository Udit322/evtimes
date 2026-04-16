// import { authMiddleware } from "@/server/middleware/auth.middleware";
// import { updateProfileImage } from "@/server/controller/auth.controller/auth.controller";

// export const POST = async (req) => {
//   return authMiddleware(req, async () => {
//     const { imageUrl } = await req.json();

//     await updateProfileImage(req.user.id, imageUrl);

//     return Response.json({ success: true });
//   });
// };

import { authMiddleware } from "@/server/middleware/auth.middleware";
import { updateProfileImage } from "@/server/controller/auth.controller/auth.controller";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const context = {};

  return authMiddleware(req, context, async () => {
    const { imageUrl } = await req.json();

    console.log("User:", context.user); // debug

    await updateProfileImage(context.user.userId, imageUrl);

    return NextResponse.json({ success: true });
  });
};