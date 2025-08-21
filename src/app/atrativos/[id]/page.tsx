import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { faker } from "@faker-js/faker";
import { Informacoes } from "@/components/public/Informacoes";
import { Badge } from "@/components/ui/badge";
import { HeroGaleria } from "@/components/public/HeroGaleria";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";

export default function PageAtrativo({ params }: { params: { id: string } }) {
  return (
    <LayoutPublic>
      <GaleriaDeImagens
        imagemUrls={Array.from({ length: 5 }, () => faker.image.url({ width: 800, height: 600 }))}
      />
      <div className="flex flex-col md:flex-row p-4 lg:px-16 w-full h-full bg-tourism-branco">
        <DescriptionSection
          subtitulo={faker.company.name()}
          descricao={faker.lorem.paragraphs(5)}
          corSubtitulo={"text-tourism-azul"}
          corDescricao={"#000"}
          align="left"
        />
        <div className=" md:1/4 h-full bg-tourism-azul  mt-8">
          <h1 className="text-white text-xl p-2 border-b-2">Perfil</h1>
          {Array.from({ length: 5 }).map((_, index) => (
            <Badge
              key={index}
              className="m-2"
              style={{
                backgroundColor: faker.color.human(),
                color: "#fff",
              }}
            >
              {faker.word.noun()}
            </Badge>
          ))}
        </div>
      </div>
      <Informacoes />
    </LayoutPublic>
  );
}
