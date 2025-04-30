import { FotoPrismaRepository } from "@/repositories/prisma/FotoPrismaRepository";
import { FotoService } from "@/services/fotoService";

export const fotoServiceFactory = () => {
  const repository = new FotoPrismaRepository();
  return new FotoService(repository);
}