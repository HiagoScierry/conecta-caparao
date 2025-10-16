/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createAtrativo,
  deleteAtrativo,
  getAtrativoById,
  updateAtrativo,
} from "@/controllers/atrativoController";
import { AtracaoForm } from "@/forms/atracaoForm";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ✅ GET atrativo por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const atrativo = await getAtrativoById(Number(id));
    if (!atrativo) {
      return new NextResponse("Atrativo not found", { status: 404 });
    }

    return NextResponse.json(atrativo, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new NextResponse("Atrativo not found", { status: 404 });
  }
}

// ✅ Atualizar atrativo
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const atrativo = await getAtrativoById(Number(id));
    if (!atrativo) {
      return new NextResponse("Atrativo not found", { status: 404 });
    }

    const {
      atracaoTuristica,
      contato,
      endereco,
      categoria,
      subCategoria,
      horarioFuncionamento,
      fotosURL,
      municipio,
      perfil,
    }: AtracaoForm & { fotosURL: string[] } = await request.json();

    // validações
    atracaoTuristicaSchema.parse(atracaoTuristica);
    contatoSchema.parse(contato);
    enderecoSchema.parse(endereco);
    horarioFuncionamentoSchema.parse(horarioFuncionamento);

    await updateAtrativo(
      Number(id),
      {
        atracaoTuristica,
        contato,
        endereco,
        categoria,
        subCategoria,
        horarioFuncionamento,
        municipio,
        perfil,
      },
      fotosURL
    );

    return new NextResponse("Atrativo updated", { status: 200 });
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

// ✅ Deletar atrativo
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteAtrativo(Number(id));
    return new NextResponse("Atrativo deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Atrativo not found";

    return new NextResponse(errorMessage, { status: 500 });
  }
}
