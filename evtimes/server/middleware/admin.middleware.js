 import { NextResponse } from "next/server";

// export const adminMiddleware = async (req, context) => {
// console.log("role:", context.user);

//   try {
    
//     if (!context.user || context.user.role !== "super_admin") {
//       return NextResponse.json(
//         { message: "Access denied. Super Admin only." },
//         { status: 403 }
//       );
//     }

//     return context.next();
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Authorization error" },
//       { status: 403 }
//     );
//   }
// };

export const adminMiddleware = async (req, context, next) => {
  console.log("ADMIN USER:", context.user); // should NOT be undefined now

  if (!context.user || context.user.role !== "super_admin") {
    return NextResponse.json(
      { message: "Access denied. Super Admin only." },
      { status: 403 }
    );
  }

  return next();
};