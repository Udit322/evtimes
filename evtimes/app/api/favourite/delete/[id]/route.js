import { removeFavouritebyId} from "@/server/controller/favourite.controller/favourite.controller";
import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";

export async function DELETE(req, { params }) {
    await connectDB();  
    try {
        
        const { id } = await params;
       // console.log("PARAMS:", params); // Debugging line to check the structure of params
        // console.log("USER ID PARAM:", userId);
        // console.log("NEWS ID PARAM:", newsId);
        const result = await removeFavouritebyId(id);
        return NextResponse.json(result, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }       
};