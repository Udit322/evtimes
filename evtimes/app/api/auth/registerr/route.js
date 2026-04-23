import { connectDB } from "@/server/config/db";
import { NextResponse } from "next/server";
import { registerUser } from "@/server/controller/auth.controller/auth.controller";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const result = await registerUser(body);
    
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
};



// import { NextResponse } from "next/server";
// import { connectDB } from "@/server/config/db";
// import { registerUser } from "@/server/controller/auth.controller/auth.controller";

// import { compose } from "@/server/middleware/compose";
// import { parseBody } from "@/server/middleware/body.middleware";

// export const POST = compose(
//   [parseBody],
//   async (req, context) => {
//     try {
//       await connectDB();

//       const result = await registerUser(context.body);

//       return NextResponse.json(result, { status: 201 });
//     } catch (err) {
//       return NextResponse.json(
//         { error: err.message },
//         { status: 400 }
//       );
//     }
//   }
// );



