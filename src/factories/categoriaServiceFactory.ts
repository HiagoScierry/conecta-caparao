import { CategoriaPrismaRepository } from "@/repositories/prisma/CategoriaPrismaRepository"
import { CategoriaService } from "@/services/categoriaService"

export const categoriaServiceFactory = () => {
  const categoriaRepository = new CategoriaPrismaRepository()

  return new CategoriaService(
    categoriaRepository
  )
}