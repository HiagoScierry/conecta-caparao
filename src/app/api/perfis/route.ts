import { getAllPerfis } from "@/controllers/perfisController";
import { NextResponse } from "next/server";

export async function GET() {
  const perfis = await getAllPerfis();
  return NextResponse.json(perfis);
}