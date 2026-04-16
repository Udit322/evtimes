 import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";
import { updateUserRole } from "@/server/controller/auth.controller/auth.controller";
import { NextResponse } from "next/server"; 
 
 export const POST = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {
      const { userId,role } = await req.json();  
    
    console.log("User:", context.user); // debug
     
        await updateUserRole(userId, role);
         
        return NextResponse.json({ success: true });
    }
    );
    