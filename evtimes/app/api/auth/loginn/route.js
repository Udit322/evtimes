// import { NextResponse, NextRequest } from "next/server";
// import { loginUser } from "@/server/controller/auth.controller/auth.controller";
// import { connectDB } from "@/server/config/db";


// export async function POST(req: NextRequest){

    
//     await connectDB();

//     try{

//         const body = await req.json();
//         const result = await loginUser( body);


//         return NextResponse.json(result, {status:200});
//     }
//     catch(error:any){

// return NextResponse.json({message: error.message || "Internal Server Error"}, {status: 500});

//     }
// }
import { connectDB } from "@/server/config/db";
import { NextResponse } from "next/server";
import { loginUser } from "@/server/controller/auth.controller/auth.controller";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const result = await loginUser(body);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}