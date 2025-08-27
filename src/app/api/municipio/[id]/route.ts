/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  deleteMunicipio,
  getMunicipioById,
  updateMunicipio,
} from "@/controllers/municipioController";
import { contatoSchema } from "@/schemas/contatoSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ✅ GET municipio por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const municipio = await getMunicipioById(id);
    if (!municipio) {
      return new NextResponse("Municipio not found", { status: 404 });
    }

    return NextResponse.json(municipio, { status: 200 });
  } catch (error) {
    console.error("GET municipio error:", error);
    return new NextResponse("Municipio not found", { status: 404 });
  }
}

// ✅ Atualizar municipio
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { municipio, contato, fotosUrl } = await request.json();

    municipioSchema.parse(municipio);
    contatoSchema.parse(contato);

    const newMunicipio = await updateMunicipio(
      id,
      municipio,
      contato,
      fotosUrl
    );

    return new NextResponse(JSON.stringify(newMunicipio), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed!", error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("PUT municipio error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// ✅ Deletar municipio
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteMunicipio(id);
    return new NextResponse("Municipio deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE municipio error:", error);
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Municipio not found";

    return new NextResponse(errorMessage, { status: 500 });
  }
}
