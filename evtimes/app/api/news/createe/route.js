import { createNewsHandler } from "@/server/controller/news.controller/news.controller";
import { verifyToken } from "@/server/utils/jwt";
import { connectDB } from "@/server/config/db";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = verifyToken(token);

    const news = await createNewsHandler(body, decoded.userId);

    return Response.json({ message: "News created", news });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}