import { getUltimasNoticias } from "@/controllers/dashboardController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const data = await getUltimasNoticias(limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar últimas notícias:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
