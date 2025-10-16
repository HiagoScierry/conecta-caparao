import { getAtracoesPorMunicipio } from "@/controllers/dashboardController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAtracoesPorMunicipio();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar atrações por município:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
