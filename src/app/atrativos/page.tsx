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
        <div className="flex  md:flex-row gap-6 mt-8">
          <div className="w-1/4">
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
              title="Faixa de Preço"
              items={[
                { label: "Gratuito", value: "gratuito" },
                { label: "Até R$ 50", value: "ate_50" },
                { label: "R$ 50 a R$ 100", value: "50_a_100" },
                { label: "Acima de R$ 100", value: "acima_100" },
              ]}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />
          </div>
          <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
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
