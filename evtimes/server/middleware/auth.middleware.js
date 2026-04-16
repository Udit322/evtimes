// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const authMiddleware = (req) => {
//   const header = req.headers.get("authorization");

//   if (!header || !header.startsWith("Bearer ")) {
//     throw new Error("Unauthorized");
//   }

//   const token = header.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded;
//   } catch {
//     throw new Error("Invalid token");
//   }
// };

//  import { NextResponse } from "next/server";
//  import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const authMiddleware = async (req, context) => {
//   try {
//     const header = req.headers.get("authorization");
   
//     if (!header || !header.startsWith("Bearer ")) {
//       return NextResponse.json(
//         { message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const token = header.split(" ")[1];

//     const decoded = jwt.verify(token, JWT_SECRET);

//     // attach user to context
//     context.user = decoded;

//     return context.next();
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Invalid token" },
//       { status: 401 }
//     );
//   }
// };

// export const authMiddleware = async (req, context, next) => {
//   try {
//     const header = req.headers.get("authorization");

//     if (!header || !header.startsWith("Bearer ")) {
//       return NextResponse.json(
//         { message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const token = header.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     context.user = decoded; // persists now ✅

//     return next();
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Invalid token" },
//       { status: 401 }
//     );
//   }
// };

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, context, next) => {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    context.user = decoded;

    return next();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
};