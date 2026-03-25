import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Rotas que requerem autenticação de admin (qualquer método)
const ADMIN_ROUTES = [
  '/api/usuarios',
];

// Rotas que requerem apenas autenticação (qualquer método)
const PROTECTED_ROUTES = [
  '/painel',
];

// Rotas de dados onde apenas métodos de mutação requerem autenticação
const MUTATION_ROUTES = [
  '/api/atrativos',
  '/api/eventos',
  '/api/noticia',
  '/api/municipio',
  '/api/servicos',
  '/api/principais-atrativos',
  '/api/upload',
];

const MUTATION_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestMethod = request.method;

  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isMutationRoute =
    MUTATION_ROUTES.some(route => pathname.startsWith(route)) &&
    MUTATION_METHODS.includes(requestMethod);

  if (!isAdminRoute && !isProtectedRoute && !isMutationRoute) {
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

    if (isAdminRoute && !decoded.admin) {
      return NextResponse.json(
        { message: "Acesso negado. Apenas administradores podem acessar esta rota." },
        { status: 403 }
      );
    }

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
    '/api/atrativos/:path*',
    '/api/eventos/:path*',
    '/api/noticia/:path*',
    '/api/municipio/:path*',
    '/api/servicos/:path*',
    '/api/principais-atrativos/:path*',
    '/api/upload/:path*',
    '/painel/:path*',
  ],
};
