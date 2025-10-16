/* eslint-disable @typescript-eslint/no-unused-vars */

import { deleteServico, getServicoById, updateServico } from "@/controllers/servicoController";
import { ServicoForm } from "@/forms/servicoForm";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { servicoTuristicoSchema } from "@/schemas/servicoTuristicoSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const servico = await getServicoById(Number(id));
    if (!servico) {
      return new NextResponse("Serviço não encontrado", { status: 404 });
    }

    return NextResponse.json(servico, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new NextResponse("Serviço não encontrado", { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const servico = await getServicoById(Number(id));
    if (!servico) {
      return new NextResponse("Serviço não encontrado", { status: 404 });
    }

    const {
      servico: servicoData,
      contato,
      endereco,
      municipio,
      horarioFuncionamento,
      fotoUrl,
    }: ServicoForm & { fotoUrl?: string } = await request.json();

    servicoTuristicoSchema.parse(servicoData);
    contatoSchema.parse(contato);
    enderecoSchema.parse(endereco);

    await updateServico(Number(id), {
      servico: servicoData,
      contato,
      endereco,
      municipio,
      horarioFuncionamento,
    },
      fotoUrl,
    );

    return new NextResponse("Serviço atualizado com sucesso", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed!", error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("PUT error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteServico(Number(id));
    return new NextResponse("Serviço deletado com sucesso", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Serviço não encontrado";

    return new NextResponse(errorMessage, { status: 500 });
  }
}
