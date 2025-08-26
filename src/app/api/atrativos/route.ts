import { createAtrativo, getAll } from "@/controllers/atrativoController";
import { atracaoTuristicaForm } from "@/forms/atracaoForm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const atrativos = await getAll();
  return NextResponse.json(atrativos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    atracaoTuristicaForm.parse(body);

    createAtrativo(body);

    return new NextResponse(JSON.stringify({ message: "Atrativo criado com sucesso!" }), {
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
