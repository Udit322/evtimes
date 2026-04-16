import { updateNewsHandler } from "@/server/controller/news.controller/news.controller";
import { verifyToken } from "@/server/utils/jwt";
import { connectDB } from "@/server/config/db";
export async function PUT(req, { params }) {
  try {

    await connectDB();

       const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      throw new Error("Invalid ID");
    }
    const body = await req.json();

    // const token = req.headers.get("authorization")?.split(" ")[1];
     const token = req.cookies.get("token")?.value;
    
    const decoded = verifyToken(token);

    const updatedNews = await updateNewsHandler(
      resolvedParams.id,
      body,
      decoded
    );

    return Response.json({
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}