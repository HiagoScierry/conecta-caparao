import { NoticiaPrismaRepository } from "@/repositories/prisma/NoticiaPrismaRepository";
import { NoticiaService } from "@/services/noticiaService";

export const noticiaServiceFactory = () => {
  const repository = new NoticiaPrismaRepository();

  return new NoticiaService(repository);
}