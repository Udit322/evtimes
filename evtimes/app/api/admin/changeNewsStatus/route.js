import {changeNewsStatusHandler} from "@/server/controller/news.controller/news.controller";
import { authMiddleware } from "@/server/middleware/auth.middleware";
import { adminMiddleware } from "@/server/middleware/admin.middleware";
import { compose } from "@/server/middleware/compose";
import { NextResponse } from "next/server";


    export const POST = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {
        const { newsId, status } = await req.json();
        console.log("User:", context.user); // debug
        await changeNewsStatusHandler(newsId, status, context.user);
        return NextResponse.json({ success: true });
    }
);

