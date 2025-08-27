import { createAtrativo, getAll } from "@/controllers/atrativoController";
import { AtracaoForm, atracaoTuristicaForm } from "@/forms/atracaoForm";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const atrativos = await getAll();
  return NextResponse.json(atrativos);
}

export async function POST(request: Request) {
  try {
    const {
      atracaoTuristica,
      contato,
      endereco,
      categoria,
      horarioFuncionamento,
      fotosURL,
      municipio,
      perfil
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
      fotosURL,
      municipio,
      perfil
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
