import { fotoServiceFactory } from "@/factories/fotoServiceFactory";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ aguarda params

    await fotoServiceFactory().deleteFoto(id);

    return new NextResponse("Foto deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE foto error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(message, { status: 500 });
  }
}
