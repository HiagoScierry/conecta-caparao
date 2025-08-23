"use client";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { Filter } from "@/components/public/Filter";
import { AtracoesCard } from "@/components/public/AtracoesCard";

export default function PaginaAtrativos() {
  const municipios = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    nome: faker.address.city(),
    imagemUrls: [faker.image.url({ width: 640, height: 480 })],
  }));

  const atracoes = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    nome: faker.company.name(),
    cidade: faker.address.city(),
    imagemUrls: [faker.image.url({ width: 640, height: 480 })],
  }));

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="A EXPERIÊNCIA VOCÊ QUEM ESCOLHE!" cor="bg-tourism-azul" />
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mt-8">
          <div className="w-full md:w-1/4 md:flex-shrink-0">
            <Filter
              title="Municípios"
              items={municipios.map((municipio) => ({
                label: municipio.nome,
                value: municipio.id.toString(),
              }))}
              onChange={(value) => console.log(value)}
              className="mb-6"
            />

            <Filter
              title="Tipo de Atrativo"
              items={[
                { label: "Cachoeira", value: "cachoeira" },
                { label: "Mirante", value: "mirante" },
                { label: "Trilha", value: "trilha" },
                { label: "Cultural", value: "cultural" },
              ]}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />

            <Filter
              title="Perfil"
              items={[
                { label: "Familia", value: "familia" },
                { label: "Grupo", value: "grupo" },
                { label: "Pet Friendly", value: "pet_friendly" },
                { label: "Com Acessibilidade", value: "com_acessibilidade" },
              ]}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />

            <Filter
              title="Apoio Turistico"
              items={[
                { label: "Rodiviaria", value: "rodoviaria" },
                { label: "Hospital", value: "hospital" },
                { label: "Farmácia", value: "farmácia" },
                { label: "Mecânica", value: "mecânica" },
                { label: "Posto de Combustivel", value: "posto_de_combustivel" },

              ]}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />
          </div>
          <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {atracoes.map((atracao) => (
              <Link key={atracao.id} href={`/atrativos/${atracao.id}`} passHref>
                <AtracoesCard
                  nome={atracao.nome}
                  cidade={atracao.cidade}
                  imagemUrls={atracao.imagemUrls}
                  id={atracao.id}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutPublic>
  );
}
