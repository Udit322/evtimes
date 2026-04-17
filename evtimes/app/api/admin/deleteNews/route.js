import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";  
import { deleteNewsHandler } from "@/server/controller/news.controller/news.controller";
import { NextResponse } from "next/server"; 

export const DELETE = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {
        const { newsId } = await req.json();
        console.log("User:", context.user); // debug
        await deleteNewsHandler(newsId, context.user);
        return NextResponse.json({ success: true });
    }
);  