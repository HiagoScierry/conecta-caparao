import { SubCategoriaPrismaRepository } from "@/repositories/prisma/SubCategoriaPrismaRepository";
import { SubcategoriaService } from "@/services/subCategoriaService";

export const SubCategoriaServiceFactory = () => {
  const subCategoriaRepository = new SubCategoriaPrismaRepository();
  const subCategoriaService = new SubcategoriaService(subCategoriaRepository);
  return subCategoriaService;
}