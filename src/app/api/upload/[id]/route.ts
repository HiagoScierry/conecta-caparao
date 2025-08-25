import { fotoServiceFactory } from "@/factories/fotoServiceFactory";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await fotoServiceFactory().deleteFoto(params.id);

    return new NextResponse("Foto deleted", { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(message, { status: 500 });
  }
}