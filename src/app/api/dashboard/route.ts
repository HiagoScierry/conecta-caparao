import { getDashboardStats } from "@/controllers/dashboardController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}