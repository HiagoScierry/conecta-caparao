import { EventoPrismaRepository } from "@/repositories/prisma/EventoPrismaRepository"
import { EventoService } from "@/services/eventoService"

export const eventoServiceFactory = () => {
  const repository = new EventoPrismaRepository()

  const service = new EventoService(repository)

  return service
}