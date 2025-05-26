import { PerfilClienteRepository } from "@/repositories/prisma/PerfilClientePrismaRepository";
import { PerfilClienteService } from "@/services/perfilClienteService";

export const perfilClienteServiceFactory = () => {
  const perfilClienteRepository = new PerfilClienteRepository();

  return new PerfilClienteService(perfilClienteRepository);
};