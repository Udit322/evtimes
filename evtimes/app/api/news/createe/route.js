import { createNewsHandler } from "@/server/controller/news.controller/news.controller";
import { connectDB } from "@/server/config/db";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 TEMP USER ID
    const userId = "66f1a2c8e4b0c123456789ab";

    const news = await createNewsHandler(body, userId);

    return Response.json({
      message: "News created",
      news,
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}