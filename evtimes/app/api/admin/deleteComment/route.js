import {authMiddleware} from "@/server/middleware/auth.middleware";
import {adminMiddleware} from "@/server/middleware/admin.middleware";
import {compose} from "@/server/middleware/compose";
import {removeComment} from "@/server/controller/comment.controller/comment.controller";
import {NextResponse} from "next/server";

export const DELETE = compose(
    [authMiddleware, adminMiddleware],
    async (req, context) => {
        const { commentId ,newsId} = await req.json();
        console.log("User:", context.user); // debug
        await removeComment(commentId, context.user, newsId);
        return NextResponse.json({ success: true });
    }
);

