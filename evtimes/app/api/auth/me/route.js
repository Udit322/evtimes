import { verifyToken } from "@/server/utils/jwt";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.json({ user: null });
  }

  try {
    const decoded = verifyToken(token);
    return Response.json({ user: decoded });
  } catch {
    return Response.json({ user: null });
  }
}