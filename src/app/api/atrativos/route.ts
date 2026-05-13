import { createAtrativo, getAll } from "@/controllers/atrativoController";
import { AtracaoForm } from "@/schemas/forms/atracaoForm";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const isAdmin = request.headers.get("x-user-admin") === "true";
  const atrativos = await getAll(!isAdmin);
  return NextResponse.json(atrativos);
}

export async function POST(request: NextRequest) {
  try {
    const {
      atracaoTuristica,
      contato,
      endereco,
      categoria,
      horarioFuncionamento,
      fotosURL,
      municipio,
      perfil,
      subCategoria
    }: AtracaoForm & { fotosURL: string[] } = await request.json();

    atracaoTuristicaSchema.parse(atracaoTuristica);
    contatoSchema.parse(contato);
    enderecoSchema.parse(endereco);
    horarioFuncionamentoSchema.parse(horarioFuncionamento);

    await createAtrativo({
      atracaoTuristica,
      contato,
      endereco,
      categoria,
      horarioFuncionamento,
      municipio,
      perfil,
      subCategoria,
      fotosURL
    });


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

    console.error('Internal server error:', error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
