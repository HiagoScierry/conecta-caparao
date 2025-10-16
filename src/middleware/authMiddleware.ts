import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Rotas que requerem autenticação de admin
const ADMIN_ROUTES = [
  '/api/usuarios',
];

// Rotas que requerem apenas autenticação
const PROTECTED_ROUTES = [
  '/painel',
];

/**
 * Middleware de autenticação e autorização
 * - Verifica se o usuário está autenticado através do JWT token
 * - Protege rotas que requerem login
 * - Protege rotas que requerem privilégios de administrador
 * - Adiciona informações do usuário nos headers das requisições
 */
export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota que precisa de proteção
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (!isAdminRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token de autenticação necessário" },
      { status: 401 }
    );
  }

  try {
    const decoded = verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      admin: boolean;
    };

    // Para rotas admin, verificar se o usuário é admin
    if (isAdminRoute && !decoded.admin) {
      return NextResponse.json(
        { message: "Acesso negado. Apenas administradores podem acessar esta rota." },
        { status: 403 }
      );
    }

    // Adicionar informações do usuário no header para as rotas protegidas
    const response = NextResponse.next();
    response.headers.set("x-user-id", decoded.userId.toString());
    response.headers.set("x-user-email", decoded.email);
    response.headers.set("x-user-admin", decoded.admin.toString());

    return response;
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return NextResponse.json(
      { message: "Token inválido" },
      { status: 401 }
    );
  }
}

export const authConfig = {
  matcher: [
    '/api/usuarios/:path*',
    '/painel/:path*',
  ],
};
