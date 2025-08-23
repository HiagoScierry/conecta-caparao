import { MunicipiosCard } from "@/components/public/MunicipiosCard";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import { faker } from "@faker-js/faker";
import Link from "next/link";

export default function PaginaMunicipios() {
  const municipios = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    nome: faker.address.city(),
    imagemUrls: [faker.image.url({ width: 640, height: 480 })],
  }));

  console.log(municipios);

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="Municípios" cor="bg-tourism-verde" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-8">
          {municipios.map((municipio) => (
            <Link key={municipio.id} href={`/municipios/${municipio.id}`} passHref>
              <MunicipiosCard
                nome={municipio.nome}
                imagemUrls={municipio.imagemUrls}
                id={municipio.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </LayoutPublic>
  );
}
