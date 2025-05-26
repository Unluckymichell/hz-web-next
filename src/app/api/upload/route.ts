import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import mathOnlyEval from "@/Utils/mathOnlyEval";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

const NEXT_PUBLIC_MAX_UPLOAD: number = mathOnlyEval(
  process.env.NEXT_PUBLIC_MAX_UPLOAD || "10 * 1024 * 1024"
);

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return new NextResponse("Invalid form data", { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const password = formData.get("password");

  if (password !== process.env.UPLOAD_PASSWORD) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!file) return new NextResponse("No file uploaded", { status: 400 });

  if (file.size > NEXT_PUBLIC_MAX_UPLOAD)
    return new NextResponse(
      `File is to large! Only ${
        NEXT_PUBLIC_MAX_UPLOAD / 1024 / 1024
      } MB allowed`,
      { status: 400 }
    );

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = path.join(process.cwd(), "public/Uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const filePath = path.join(uploadPath, Date.now() + "_" + file.name.substring(0, 30));
  await writeFile(filePath, buffer);

  return new NextResponse("Upload successful");
}
