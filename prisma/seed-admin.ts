import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@turismo.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@turismo.com',
      senha: hashedPassword,
      admin: true,
    },
  })

  console.log('Usuário administrador criado:', { admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
