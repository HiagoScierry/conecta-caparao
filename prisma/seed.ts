// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // CATEGORIA SEED
  // "Restaurantes" renomeada para "Gastronomia" a pedido da AD Caparaó (retorno de
  // março/2026): a nova categoria engloba cafés, bares, pizzarias e restaurantes,
  // que antes ficavam soltos como subcategorias sem uma categoria-guarda-chuva clara.
  await prisma.categoria.createMany({
    data: [
      { nome: 'Gastronomia' },
      { nome: 'Hospedagem' },
      { nome: 'Turismo' },
      { nome: 'Lazer' },
      { nome: 'Compras' },
      { nome: 'Serviços' }
    ]
  })


  // SUBCATEGORIA SEED
  // Adicionada "Restaurantes" -- a AD Caparaó apontou que muitos estabelecimentos não
  // se encaixavam nas subcategorias existentes por faltar essa opção genérica.
  await prisma.subcategoria.createMany({
    data: [
      { nome: 'Restaurantes' },
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