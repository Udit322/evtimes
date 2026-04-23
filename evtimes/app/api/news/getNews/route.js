import {
    getAllNewsHandler
} from "@/server/controller/news.controller/news.controller";

import {connectDB} from "@/server/config/db"

export async function GET() {
  try {
    await connectDB();

    const news = await getAllNewsHandler();

    return Response.json({ news });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}