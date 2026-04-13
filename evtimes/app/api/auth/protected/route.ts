import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = verifyToken(token);

  if (!decoded) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

 
  if (decoded.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json({ message: "Welcome Admin " });
}