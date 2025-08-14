import { MunicipiosCard } from "@/components/public/MunicipiosCard";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";

const municipiosMock = [
  {
    id: 1,
    nome: "Alegre",
    imagemUrls: [],
  },
  {
    id: 2,
    nome: "Guaçuí",
    imagemUrls: [],
  },
  {
    id: 3,
    nome: "Iúna",
    imagemUrls: [],
  },
  {
    id: 4,
    nome: "Divino de São Lourenço",
    imagemUrls: [],
  },
];

export default function PaginaMunicipios() {
  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="Municípios" cor="bg-tourism-verde" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-8">
          {municipiosMock.map((municipio) => (
            <MunicipiosCard
              key={municipio.id}
              nome={municipio.nome}
              imagemUrls={municipio.imagemUrls}
              id={municipio.id}
            />
          ))}
        </div>
      </div>
    </LayoutPublic>
  );
}
