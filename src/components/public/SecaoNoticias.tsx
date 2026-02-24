import { CardNoticia } from "./CardNoticia";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";

interface SecaoNoticiasProps {
  noticias: NoticiaFull[];
  isLoading: boolean;
}

function formatNoticiaDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function SecaoNoticias({ noticias, isLoading }: SecaoNoticiasProps) {
  const noticiasExibidas = noticias.slice(0, 3);

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-azul text-xs md:text-sm font-semibold tracking-wider uppercase">
              📰 NOTÍCIAS
            </p>
            <h2 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
              O Que Acontece no Caparaó
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="w-full h-[240px] md:h-[260px] bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (noticiasExibidas.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 space-y-3">
          <p className="text-tourism-azul text-xs md:text-sm font-semibold tracking-wider uppercase">
            NOTÍCIAS
          </p>
          <h2 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
            O Que Acontece no Caparaó
          </h2>
          <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
            Fique por dentro das últimas novidades e descobertas da nossa região
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {noticiasExibidas.map((noticia) => {
            const capa = noticia.fotos.find(f => f.capa);
            const imagemUrl = capa?.foto?.url ?? noticia.fotos[0]?.foto?.url ?? "/noticias/noticia01.jpg";

            return (
              <CardNoticia
                key={noticia.id}
                titulo={noticia.titulo}
                descricao={noticia.texto}
                imagemUrl={imagemUrl}
                data={formatNoticiaDate(noticia.data)}
                href={`/noticias/${noticia.id}`}
              />
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-tourism-marinho hover:bg-tourism-marinho/90 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/noticias" className="flex items-center gap-2">
              Ver Todas as Notícias
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
