import { authenticateUsuario } from "@/controllers/usuarioController";
import { usuarioLoginSchema } from "@/schemas/usuarioSchema";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação dos dados
    const credentials = usuarioLoginSchema.parse(data);

    const usuario = await authenticateUsuario(credentials);

    if (!usuario) {
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Gerar JWT token
    const token = sign(
      { 
        userId: usuario.id, 
        email: usuario.email,
        admin: usuario.admin 
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Criar response com cookie
    const response = NextResponse.json({
      message: "Login realizado com sucesso!",
      usuario,
    });

    // Definir cookie httpOnly
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 horas
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro no login", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
