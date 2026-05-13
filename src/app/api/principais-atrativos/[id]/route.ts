import {
  getPrincipalAtrativoById,
  updatePrincipalAtrativo,
  deletePrincipalAtrativo,
} from "@/controllers/principalAtrativoController";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return new NextResponse(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const principal = await getPrincipalAtrativoById(numericId);

    if (!principal) {
      return new NextResponse(JSON.stringify({ error: "Principal atrativo não encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(principal);
  } catch (error) {
    console.error("Erro ao buscar principal atrativo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return new NextResponse(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();

    // Validar apenas os campos fornecidos
    const updateSchema = z.object({
      posicao: z.number().min(1).max(5).optional(),
      idAtracaoTuristica: z.number().optional(),
    });

    updateSchema.parse(body);

    const { posicao, idAtracaoTuristica } = body;

    const atualizado = await updatePrincipalAtrativo(
      numericId,
      posicao,
      idAtracaoTuristica
    );

    return NextResponse.json({
      message: "Principal atrativo atualizado com sucesso!",
      data: atualizado,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed!", error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Erro ao atualizar principal atrativo:", error);

    const mensagem = error instanceof Error ? error.message : "Internal Server Error";

    return new NextResponse(JSON.stringify({ error: mensagem }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return new NextResponse(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletado = await deletePrincipalAtrativo(numericId);

    return NextResponse.json({
      message: "Principal atrativo removido com sucesso!",
      data: deletado,
    });
  } catch (error) {
    console.error("Erro ao remover principal atrativo:", error);

    const mensagem = error instanceof Error ? error.message : "Internal Server Error";

    return new NextResponse(JSON.stringify({ error: mensagem }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
