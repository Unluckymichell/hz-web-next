import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import mathOnlyEval from "@/Utils/mathOnlyEval";
import { allowedMimeTypes, mimeTypeToFileExtension } from "./types";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export async function POST(req: Request) {
  const NEXT_PUBLIC_MAX_UPLOAD: number = mathOnlyEval(
    process.env.NEXT_PUBLIC_MAX_UPLOAD || "512 * 1024 * 1024"
  );

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return new NextResponse("Invalid form data", { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || !(file instanceof File)) return new NextResponse("No file uploaded", { status: 400 });

  if (file.size > NEXT_PUBLIC_MAX_UPLOAD)
    return new NextResponse(
      `File is to large! Only ${
        NEXT_PUBLIC_MAX_UPLOAD / 1024 / 1024
      } MB allowed`,
      { status: 400 }
    );

  if (!allowedMimeTypes.includes(file.type as typeof allowedMimeTypes[number])) {
    return new NextResponse(
      `Invalid file type! Allowed types: ${allowedMimeTypes.join(", ")}`,
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = path.join(process.cwd(), "public/Uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const filePath = path.join(uploadPath, Date.now() + "_" + file.name.substring(0, 25) + mimeTypeToFileExtension[file.type as typeof allowedMimeTypes[number]]);
  await writeFile(filePath, buffer);

  return new NextResponse("Upload successful");
}
