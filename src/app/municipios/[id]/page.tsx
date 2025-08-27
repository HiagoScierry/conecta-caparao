import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Atrativos } from "@/components/public/Atrativos";
import { faker } from "@faker-js/faker";
import { Informacoes } from "@/components/public/Informacoes";

export default function PaginaMunicipios({
  params,
}: {
  params: { id: string };
}) {
  const municipio = {
    id: Number(params.id),
    nome: faker.address.city(),
    subtitulo: faker.lorem.sentence(),
    descricao: faker.lorem.paragraphs(3),
    imagemUrls: Array.from({ length: 5 }, () =>
      faker.image.url({ width: 640, height: 480 })
    ),
  };

  if (!municipio) {
    return <div>Município não encontrado</div>;
  }

  return (
    <LayoutPublic>
      <Hero
        nome={municipio.nome}
        imagemUrl={municipio.imagemUrls ? municipio.imagemUrls[0] : undefined}
      />

      <DescriptionSection
        subtitulo={municipio.subtitulo}
        descricao={municipio.descricao}
        corSubtitulo={"text-tourism-azul"}
      />
      <GaleriaDeImagens imagemUrls={municipio.imagemUrls} />

      <div className="w-full bg-tourism-branco py-12">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-bold pb-12 md:text-5xl">Atrativos</h2>
          <Atrativos />
        </div>
      </div>

      <Informacoes />
    </LayoutPublic>
  );
}
