import { getUserFavourites } from "@/server/controller/favourite.controller/favourite.controller";
import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";

export async function GET(req, { params }) {
    await connectDB();      
    try {
        const favourites = await getUserFavourites( params );
        console.log("FINAL DATA:", favourites);
        return NextResponse.json(favourites, { status: 200 });
    }   catch (error) {         
        return NextResponse.json({ error: error.message }, { status: 400 });
    }       
};