import {
  getAllPrincipaisAtrativos,
  createPrincipalAtrativo,
  getMaxPrincipaisAtrativos,
  getTotalPrincipaisAtrativos,
  getAtratosParaPrincipal,
} from "@/controllers/principalAtrativoController";
import { principalAtrativoInputSchema } from "@/schemas/principalAtrativoSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const municipioId = url.searchParams.get("municipioId");
    const categoriaId = url.searchParams.get("categoriaId");
    const subcategoriaId = url.searchParams.get("subcategoriaId");
    const perfilClienteId = url.searchParams.get("perfilClienteId");

    const filters = {
      municipioId: municipioId ? Number(municipioId) : undefined,
      categoriaId: categoriaId ? Number(categoriaId) : undefined,
      subcategoriaId: subcategoriaId ? Number(subcategoriaId) : undefined,
      perfilClienteId: perfilClienteId ? Number(perfilClienteId) : undefined,
    };

    if (type === "max") {
      const max = await getMaxPrincipaisAtrativos();
      return NextResponse.json({ max });
    }

    if (type === "count") {
      const total = await getTotalPrincipaisAtrativos();
      return NextResponse.json({ total });
    }

    if (type === "disponiveis") {
      const atratosDisponiveis = await getAtratosParaPrincipal(filters);
      return NextResponse.json(atratosDisponiveis);
    }

    const principais = await getAllPrincipaisAtrativos();
    const max = await getMaxPrincipaisAtrativos();
    const total = await getTotalPrincipaisAtrativos();

    return NextResponse.json({
      principais,
      max,
      total,
    });
  } catch (error) {
    console.error("Erro ao buscar principais atrativos:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    principalAtrativoInputSchema.parse(body);

    const { posicao, idAtracaoTuristica } = body;

    const novoAtual = await createPrincipalAtrativo(posicao, idAtracaoTuristica);

    return new NextResponse(
      JSON.stringify({
        message: "Principal atrativo criado com sucesso!",
        data: novoAtual,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed!", error.errors);
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Erro ao criar principal atrativo:", error);

    const mensagem = error instanceof Error ? error.message : "Internal Server Error";

    return new NextResponse(JSON.stringify({ error: mensagem }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
