import {findUserByEmailHandler} from "@/server/controller/auth.controller/auth.controller";
import { NextResponse } from "next/server"; 
import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";

export const POST = compose(

    [authMiddleware, adminMiddleware],
    async (req, context) => {
        const { email } = await req.json();
        console.log("User:", context.user); // debug
        const user = await findUserByEmailHandler(email);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });
    }   
    );
