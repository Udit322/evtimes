import{addFavourite} from "@/server/controller/favourite.controller/favourite.controller";
import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";




export async function POST(req) {
    await connectDB();
    try {        const body = await req.json();
        const result = await addFavourite(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }  
};
