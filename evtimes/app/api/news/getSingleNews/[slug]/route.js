import { getSingleNewsHandler } from "@/server/controller/news.controller/news.controller";
import { connectDB } from "@/server/config/db";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const slug = resolvedParams.slug;    
    console.log("Received slug:", slug); // Debug log for slug value   
    if (!slug) {
      throw new Error("Invalid slug");
    }   
    const news = await getSingleNewsHandler(slug);

    if (!news) {
      return Response.json({ error: "News not found" }, { status: 404 });
    }
    return Response.json({ news });
    } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
    }
};