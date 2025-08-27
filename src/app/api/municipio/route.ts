import { createMunicipio, getAllMunicipios } from "@/controllers/municipioController";
import { contatoSchema } from "@/schemas/contatoSchema";
import { municipioSchema } from "@/schemas/municipioSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const municipios = await getAllMunicipios();
  return NextResponse.json(municipios);
}

export async function POST(request: Request) {
  try {
    const { municipio, contato, fotosUrl } = await request.json();

    municipioSchema.parse(municipio);
    contatoSchema.parse(contato);

    const newMunicipio = await createMunicipio(municipio, contato, fotosUrl);

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
