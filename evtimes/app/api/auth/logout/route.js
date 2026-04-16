// import { serialize } from "cookie";

// export async function POST() {
//   return new Response(JSON.stringify({ success: true }), {
//     headers: {
//       "Set-Cookie": serialize("token", "", {
//         httpOnly: true,
//         expires: new Date(0),
//         path: "/",
//       }),
//     },
//   });
// }


//Using NextResponse for better cookie handling in Next.js 13+: and consistency which wasnt there in previous code of logout route

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: false,      // dev and consistent with login route, replace with true in production
    sameSite: "lax",    // consistent with login route
    expires: new Date(0),
    path: "/",
  });

  return response;
}