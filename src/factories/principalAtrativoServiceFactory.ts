import { PrincipalAtativoPrismaRepository } from "@/repositories/prisma/PrincipalAtativoPrismaRepository"
import { PrincipalAtrativoService } from "@/services/principalAtrativoService"

export const principalAtrativoServiceFactory = () => {
  const principalAtrativoRepository = new PrincipalAtativoPrismaRepository()

  return new PrincipalAtrativoService(
    principalAtrativoRepository
  )
}
