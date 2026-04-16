import {
    findUserByIdHandler
} from "@/server/controller/auth.controller/auth.controller";
import { authMiddleware} from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";
import { NextResponse } from "next/server";     
export const POST = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {   
        const { userId } = await req.json();
        console.log("User:", context.user);
        const user = await findUserByIdHandler(userId);
        return NextResponse.json({ success: true, user });
    }
);