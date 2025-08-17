import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { faker } from "@faker-js/faker";
import { Informacoes } from "@/components/public/Informacoes";
import { Badge } from "@/components/ui/badge";
import { HeroGaleria } from "@/components/public/HeroGaleria";

export default function PageAtrativo({ params }: { params: { id: string } }) {
  return (
    <LayoutPublic>
      <HeroGaleria
        imagemUrls={Array.from({ length: 5 }, () => faker.image.url())}
      />
      <div className="flex justify-between items-start p-4 w-full h-full bg-tourism-branco">
        <DescriptionSection
          subtitulo={faker.company.name()}
          descricao={faker.lorem.paragraphs(5)}
          corSubtitulo={"#000"}
          corDescricao={"#000"}
        />
        <div className="w-1/4 h-full bg-[#0096E1] mt-8">
          <h1 className="text-white text-xl p-2">Perfil</h1>
          {Array.from({ length: 5 }).map((_, index) => (
            <Badge
              key={index}
              className="m-1"
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
