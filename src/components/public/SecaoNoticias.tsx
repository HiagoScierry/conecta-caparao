import { CardNoticia } from "./CardNoticia";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const noticias = [
  {
    id: 1,
    titulo: "Caparaó é Destaque Nacional em Observação de Aves",
    descricao:
      "A região se consolida como um dos melhores destinos para observadores de aves, com mais de 400 espécies catalogadas[...]",
    imagemUrl: "/noticias/noticia01.jpg",
    data: "15 Dez 2025",
  },
  {
    id: 2,
    titulo: "Festival de Café das Montanhas Atrai Milhares",
    descricao:
      "Evento celebra a tradição cafeeira da região com degustações, workshops e apresentações culturais[...]",
    imagemUrl: "/noticias/noticia02.jpg",
    data: "27 Dez 2025",
  },
  {
    id: 3,
    titulo: "Nova Trilha Ecológica Inaugurada no Parque",
    descricao:
      "Percurso de 8km oferece vistas panorâmicas e acesso a cachoeiras preservadas para os mais[...]",
    imagemUrl: "/noticias/noticia03.jpg",
    data: "01 Jan 2026",
  },
];

export function SecaoNoticias() {
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
          <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
            Fique por dentro das últimas novidades e descobertas da nossa região
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {noticias.map((noticia) => (
            <CardNoticia
              key={noticia.id}
              titulo={noticia.titulo}
              descricao={noticia.descricao}
              imagemUrl={noticia.imagemUrl}
              data={noticia.data}
              href={`/noticias/${noticia.id}`}
            />
          ))}
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
