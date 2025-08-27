import { createServico, getAll } from "@/controllers/servicoController";
import { ServicoForm } from "@/forms/servicoForm";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { servicoTuristicoSchema } from "@/schemas/servicoTuristicoSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const servicos = await getAll();
  return NextResponse.json(servicos);
}

export async function POST(request: NextRequest) {
  try {
    const {
      servico,
      contato,
      endereco,
      municipio,
      horarioFuncionamento,
      fotoUrl,
    }: ServicoForm & { fotoUrl?: string } = await request.json();

    servicoTuristicoSchema.parse(servico);
    contatoSchema.parse(contato);
    enderecoSchema.parse(endereco);

    await createServico({
      servico,
      contato,
      endereco,
      municipio,
      horarioFuncionamento,
      fotoUrl,
    });


    return new NextResponse(JSON.stringify({ message: "Serviço criado com sucesso!" }), {
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
