import { getAllSubCategorias } from "@/controllers/subCategoriaController";
import { NextResponse } from "next/server";

export async function GET() {
  const subcategorias = await getAllSubCategorias();
  return NextResponse.json(subcategorias);
}