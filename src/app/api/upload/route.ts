import { NextRequest, NextResponse } from "next/server";
import { uploadDir } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { status: "error", message: "No file provided or invalid file type" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const fileUrl = await uploadDir(buffer, file.name);

    return NextResponse.json({
      status: "success",
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (err) {
    console.error("Error saving file:", err);
    return NextResponse.json(
      { status: "error", message: "Failed to save file" },
      { status: 500 }
    );
  }
}
