import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado" },
        { status: 401 }
      );
    }

    const decoded = verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      admin: boolean;
    };

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        admin: decoded.admin,
      },
    });
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return NextResponse.json(
      { message: "Token inválido" },
      { status: 401 }
    );
  }
}
