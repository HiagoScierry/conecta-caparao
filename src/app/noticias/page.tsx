import { DefaultCard } from "@/components/public/DefaultCard";
import { DefaultHeader } from "@/components/public/DefaultHeader";
import { LayoutPublic } from "@/components/public/Layout";
import { faker } from "@faker-js/faker";

export default function PaginaNoticias() {
  const noticias = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    nome: faker.company.name(),
    data: new Date(2023, index % 12, index + 1).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    imagemUrl: faker.image.url({ width: 640, height: 480 }),
  }));

  return (
    <LayoutPublic>
        <div className="w-full mx-auto flex justify-center items-center my-8">
          <DefaultHeader
            titulo="Eventos"
            imagemUrl={faker.image.url({ width: 640, height: 480 })}
            linkHref={`/eventos/1`}
            linkText="Ver todos os eventos"
            linkStyle="text"
          />
        </div>

        <div className="container mx-auto px-4 md:px-16 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {noticias.map((noticia) => (
              <DefaultCard
                key={noticia.id}
                titulo={noticia.nome}
                imagemUrl={noticia.imagemUrl}
                link={`/noticias/${noticia.id}`}
              />
            ))}
          </div>
        </div>
    </LayoutPublic>
  );
}