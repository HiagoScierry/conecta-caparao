import { uploadDir } from "@/lib/upload";
import { NextRequest, NextResponse } from "next/server";
import { fotoServiceFactory } from "@/factories/fotoServiceFactory";

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
  const newFileName = `${Date.now()}-${file.name}`;

  try {
    const fileUrl = await uploadDir(buffer, newFileName);

    const fotoService = fotoServiceFactory();

    await fotoService.createFoto(fileUrl);

    return NextResponse.json({
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