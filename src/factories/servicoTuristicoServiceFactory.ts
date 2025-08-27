import { ServicoTuristicoPrismaRepository } from "@/repositories/prisma/ServicoTuristicoPrismaRepository"
import { ServicoTuristicoService } from "@/services/servicoTuristicoService"

export const servicoTuristicoServiceFactory = () => {
  const repository = new ServicoTuristicoPrismaRepository()
  const service = new ServicoTuristicoService(
    repository
  )
  return service
}