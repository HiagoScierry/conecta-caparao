import { deleteUsuario, getUsuarioById, updateUsuario } from "@/controllers/usuarioController";
import { usuarioUpdateSchema } from "@/schemas/usuarioSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const usuario = await getUsuarioById(Number(id));

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    // Validação dos dados
    const validatedData = usuarioUpdateSchema.parse(data);

    const usuario = await updateUsuario(Number(id), validatedData);

    return NextResponse.json({
      message: "Usuário atualizado com sucesso!",
      usuario,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        return NextResponse.json(
          { message: error.message },
          { status: 404 }
        );
      }
      
      if (error.message === "Email já está em uso") {
        return NextResponse.json(
          { message: error.message },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: "Erro ao atualizar usuário", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteUsuario(Number(id));

    return NextResponse.json({
      message: "Usuário excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    
    if (error instanceof Error && error.message === "Usuário não encontrado") {
      return NextResponse.json(
        { message: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao excluir usuário", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
