import react from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { MunicipiosCard } from "@/components/public/MunicipiosCard";
import { Banner } from "@/components/public/Banner";

const municipiosMock = [
  {
    id: "1",
    nome: "Alegre",
    imagemUrl: "",
    slug: "alegre",
  },
  {
    id: "2",
    nome: "Guaçuí",
    imagemUrl: "",
    slug: "guacui",
  },
  {
    id: "3",
    nome: "Iúna",
    imagemUrl: "",
    slug: "iuna",
  },
  {
    id: "4",
    nome: "Divino de São Lourenço",
    imagemUrl: "",
    slug: "divino-de-sao-lourenco",
  },
];

export default function PaginaMunicipios() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-tourism-bege">
          <div className="container mx-auto py-8 px-4 md:px-16">
            {/* Banner */}
            <Banner titulo="Municípios" cor="bg-tourism-verde" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-8">
              {/* Cards */}
              {municipiosMock.map((municipio) => (
                <MunicipiosCard
                  key={municipio.id}
                  nome={municipio.nome}
                  imagemUrl={municipio.imagemUrl}
                  slug={municipio.slug}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
