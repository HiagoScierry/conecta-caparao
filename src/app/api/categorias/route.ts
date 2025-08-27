import { getAllCategorias } from "@/controllers/categoriaController";
import { NextResponse } from "next/server";

export async function GET() {
  const categorias = await getAllCategorias();
  return NextResponse.json(categorias);
}