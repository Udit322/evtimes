import{
    authMiddleware
} from
"@/server/middleware/auth.middleware";
import {
    findUserByIdHandler
} from "@/server/controller/auth.controller/auth.controller";
import {
    NextResponse
} from "next/server";

export const GET = async (req) => {
    const context = {}; 
    return authMiddleware(req, context, async () => {
        const user = await findUserByIdHandler(context.user.userId);
        return NextResponse.json({ user });
    });
};