import { createUsuario, getAllUsuarios } from "@/controllers/usuarioController";
import { usuarioCreateSchema } from "@/schemas/usuarioSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const usuarios = await getAllUsuarios();
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { message: "Erro ao buscar usuários", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação dos dados
    const validatedData = usuarioCreateSchema.parse(data);

    const usuario = await createUsuario(validatedData);

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", usuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    
    if (error instanceof Error && error.message === "Email já está em uso") {
      return NextResponse.json(
        { message: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao criar usuário", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
