import { PrincipalAtrativoPrismaRepository } from "@/repositories/prisma/PrincipalAtrativoPrismaRepository"
import { PrincipalAtrativoService } from "@/services/principalAtrativoService"

export const principalAtrativoServiceFactory = () => {
  const principalAtrativoRepository = new PrincipalAtrativoPrismaRepository()

  return new PrincipalAtrativoService(
    principalAtrativoRepository
  )
}
