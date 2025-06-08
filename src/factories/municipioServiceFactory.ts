import { MunicipioPrimaRepository } from "@/repositories/prisma/MunicipioPrismaRepository";
import { MunicipioService } from "@/services/municipioService"

export const municipioServiceFactory = () => {
  const municipioRepository = new MunicipioPrimaRepository();

  const municipioService = new MunicipioService(
    municipioRepository,
  );
  return municipioService;
}