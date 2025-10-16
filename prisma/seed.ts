// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // CATEGORIA SEED
  await prisma.categoria.createMany({
    data: [
      { nome: 'Restaurantes' },
      { nome: 'Hospedagem' },
      { nome: 'Turismo' },
      { nome: 'Lazer' },
      { nome: 'Compras' },
      { nome: 'Serviços' }
    ]
  })


  // SUBCATEGORIA SEED
  await prisma.subcategoria.createMany({
    data: [
      { nome: 'Cafés' },
      { nome: 'Bares' },
      { nome: 'Pizzarias' },
      { nome: 'Hotéis' },
      { nome: 'Pousadas' },
      { nome: 'Hostels' },
      { nome: 'Agências de Viagem' },
      { nome: 'Guias Turísticos' },
      { nome: 'Parques' },
      { nome: 'Museus' },
      { nome: 'Shopping Centers' },
      { nome: 'Lojas de Artesanato' },
      { nome: 'Salões de Beleza' },
      { nome: 'Oficinas Mecânicas' }
    ]
  })

  // PERFIL CLIENTE CATEGORY
  await prisma.perfilCliente.createMany({
    data: [
      { nome: 'Famílias' },
      { nome: 'Casais' },
      { nome: 'Aventureiros' },
      { nome: 'Turistas Gastronômicos' },
      { nome: 'Turistas Culturais' },
      { nome: 'Compradores' },
      { nome: 'Executivos' }
    ]
  })


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });