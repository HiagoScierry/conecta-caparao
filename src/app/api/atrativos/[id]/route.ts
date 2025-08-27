/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAtrativo, deleteAtrativo, getAtrativoById, updateAtrativo } from "@/controllers/atrativoController";
import { AtracaoForm } from "@/forms/atracaoForm";
import { atracaoTuristicaSchema } from "@/schemas/atracaoTuristicaSchema";
import { contatoSchema } from "@/schemas/contatoSchema";
import { enderecoSchema } from "@/schemas/enderecoSchema";
import { horarioFuncionamentoSchema } from "@/schemas/horarioFuncionamentoSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const atrativo = await getAtrativoById(Number(params.id));
    return NextResponse.json(atrativo, { status: 200 });
  } catch (error) {
    return new NextResponse("Atrativo not found", { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const atrativo = await getAtrativoById(Number(params.id));

    if (!atrativo) {
      return new NextResponse("Atrativo not found", { status: 404 });
    }

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

    await updateAtrativo(Number(params.id), {
      atracaoTuristica,
      contato,
      endereco,
      categoria,
      horarioFuncionamento,
      municipio,
      perfil
    }, fotosURL);


  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed!', error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error('An unexpected error occurred:', error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAtrativo(Number(params.id));

    return new NextResponse("Atrativo deleted", { status: 200 });
  } catch (error) {
    const errorMessage = (error && typeof error === "object" && "message" in error) ? (error as { message: string }).message : "Municipio not found";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
