import { connectDB } from "@/server/config/db";
import Favourite from "@/server/model/Favourite/favourite.model";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, newsId } = body;

    if (!userId || !newsId) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const fav = await Favourite.create({ userId, newsId });

    return Response.json({
      message: "Favourite created ✅",
      data: fav,
    });

  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}