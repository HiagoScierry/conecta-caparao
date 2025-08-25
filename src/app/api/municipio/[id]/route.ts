/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteMunicipio, getMunicipioById, updateMunicipio } from "@/controllers/municipioController";
import { contatoSchema } from "@/schemas/contatoSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const municipio = await getMunicipioById(params.id);
    return NextResponse.json(municipio, { status: 200 });
  } catch (error) {
    return new NextResponse("Municipio not found", { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { municipio, contato, fotosUrl } = await request.json();

    municipioSchema.parse(municipio);
    contatoSchema.parse(contato);

    const newMunicipio = await updateMunicipio(params.id, municipio, contato, fotosUrl);

    return new Response(JSON.stringify(newMunicipio), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed!', error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteMunicipio(params.id);
    return new NextResponse("Municipio deleted", { status: 200 });
  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message: string }).message : "Municipio not found";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
