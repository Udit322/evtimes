import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";
import { updateUserStatus } from "@/server/controller/auth.controller/auth.controller";
import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   const context = {};

//   return authMiddleware(req, context, async () => {
//     const { status } = await req.json();

//     console.log("User:", context.user); // debug

//     await updateUserStatus(context.user.userId, status);

//     return NextResponse.json({ success: true });
//   });
// };

 export const POST = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {
      const { userId,status } = await req.json();  
    
    console.log("User:", context.user); // debug
     
        await updateUserStatus(userId, status);
         
        return NextResponse.json({ success: true });
    }
    );
