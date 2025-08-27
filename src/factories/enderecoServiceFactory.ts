import { EnderecoPrismaRepository } from "@/repositories/prisma/EnderecoPrismaReporitory"
import { EnderecoService } from "@/services/enderecoService"

export const enderecoServiceFactory = () => {
  const repository = new EnderecoPrismaRepository()

  return new EnderecoService(repository)
}