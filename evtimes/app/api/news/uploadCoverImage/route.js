import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/server/middleware/auth.middleware";

export async function POST(req) {
  try {
    //  Protect route (user must be logged in)
    let user = null;

    await authMiddleware(req, {}, async (context) => {
      user = context.user;
    });

    if (!user  || user.role == "user") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    //  Parse form-data
    const formData = await req.formData();
    const file = formData.get("image");

    //  No file
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    //  VALIDATION

    //  Allowed MIME types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP allowed" },
        { status: 400 }
      );
    }

    //  File size limit (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 2MB)" },
        { status: 400 }
      );
    }

    // Extension check
    const ext = file.name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "webp"];

    if (!allowedExt.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file extension" },
        { status: 400 }
      );
    }

    //  Convert file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //  Unique filename
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public/newsCoverImages");
    const filePath = path.join(uploadDir, fileName);

    await mkdir(uploadDir, { recursive: true });

    await writeFile(filePath, buffer);

    //  Public URL
    const fileUrl = `/newsCoverImages/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

