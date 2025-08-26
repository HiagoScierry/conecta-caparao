import { AtracaoTuristicaPrismaRepository } from "@/repositories/prisma/AtracaoTuristicaPrismaRepository"
import { AtracaoTuristicaService } from "@/services/atracaoTuristicaService"

export const atracaoTuristicaServiceFactory = () => {
  const repository = new AtracaoTuristicaPrismaRepository()
  const service = new AtracaoTuristicaService(
    repository
  )
  return service
}