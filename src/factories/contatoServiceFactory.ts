import { ContatoPrismaRepository } from "@/repositories/prisma/ContatoPrismaRepository";
import { ContatoService } from "@/services/contatoService";

export const contatoServiceFactory = (): ContatoService => {
  const repository = new ContatoPrismaRepository();
  return new ContatoService(repository);
}