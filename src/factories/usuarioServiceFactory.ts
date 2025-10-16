import { UsuarioPrismaRepository } from "@/repositories/prisma/UsuarioPrismaRepository";
import { UsuarioService } from "@/services/usuarioService";

export const usuarioServiceFactory = (): UsuarioService => {
  const repository = new UsuarioPrismaRepository();
  return new UsuarioService(repository);
}
