import { ContatoPrismaRepository } from "@/repositories/prisma/ContatoPrismaRepository";
import { MunicipioPrimaRepository } from "@/repositories/prisma/MunicipioPrismaRepository";
import { MunicipioService } from "@/services/municipioService"

export const municipioServiceFactory = () => {
  const municipioRepository = new MunicipioPrimaRepository();
  const contatoRepository = new ContatoPrismaRepository();

  const municipioService = new MunicipioService(
    municipioRepository,
    contatoRepository
  );
  return municipioService;
}