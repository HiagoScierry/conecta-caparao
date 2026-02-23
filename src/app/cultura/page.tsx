import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { SecaoNoticias } from "@/components/public/SecaoNoticias";
import { CardNoticia } from "@/components/public/CardNoticia";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const noticiasCultura = [
  {
    id: 1,
    titulo: "Festival do Café e Sabores",
    descricao:
      "Uma celebração das tradições do Caparaó com músicas locais, bancas de produtos artesanais e degustações de café e quitandas.",
    imagemUrl: "/noticias/noticia01.jpg",
    data: "10 Fev 2026",
  },
  {
    id: 2,
    titulo: "Roda de Viola na Praça",
    descricao:
      "Encontros semanais que mantêm viva a tradição musical da região — histórias e canções passadas entre gerações.",
    imagemUrl: "/noticias/noticia02.jpg",
    data: "02 Mar 2026",
  },
  {
    id: 3,
    titulo: "Feira de Artesanato Local",
    descricao:
      "Artesãos expõem cerâmicas, bordados e trabalhos em madeira, garantindo renda e preservação cultural.",
    imagemUrl: "/noticias/noticia03.jpg",
    data: "18 Mar 2026",
  },
];

export default function CulturaPage() {
  return (
    <LayoutPublic>
      <Hero
        titulo="As Raízes do Caparaó"
        subtitulo="Uma história tecida nas montanhas, preservada pelo coração do povo"
        imagemUrl="/Hero.jpg"
      />

      <section className="py-14 md:py-20 px-4 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-tourism-verde text-xs md:text-sm font-semibold tracking-wider uppercase mb-2">
              Nossa Essência
            </p>

            <h2 className="text-tourism-marinho text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Uma História Tecida nas Montanhas
            </h2>

            <p className="text-tourism-cinza-escuro text-base mb-2 md:text-lg max-w-prose leading-relaxed">
              Nas encostas do Pico da Bandeira, onde o café cresce em harmonia
              com a altitude, nasceu uma cultura única. Os primeiros
              colonizadores trouxeram tradições que se misturaram com os saberes
              indígenas, criando uma identidade própria.
            </p>
            <p className="text-tourism-cinza-escuro text-base mb-2 md:text-lg max-w-prose leading-relaxed">
              A música ecoa nas praças às sextas-feiras, quando as violas contam
              histórias de amor, trabalho e fé. O aroma do café recém-torrado se
              mistura com o cheiro de quitandas saindo do forno à lenha,
              receitas passadas de avó para neta há mais de um século.
            </p>
            <p className="text-tourism-cinza-escuro text-base mb-2 md:text-lg max-w-prose leading-relaxed">
              Aqui, cada festa, cada receita, cada artesanato carrega a alma de
              um povo que aprendeu a viver em equilíbrio com a natureza,
              respeitando a terra que os alimenta e as montanhas que os
              protegem.
            </p>
          </div>

          <div className="flex justify-end">
            <div className="relative max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-xl transform md:-translate-x-8 p-8 border-l-4 border-tourism-azul">
                <h3 className="text-tourism-marinho text-2xl font-bold">
                  O Legado Vivo
                </h3>
                <p className="text-tourism-cinza-escuro mt-4">
                  Cada ponto turístico cultural do Caparaó não é apenas um lugar
                  para visitar, mas uma porta para vivenciar tradições
                  autênticas, conhecer pessoas acolhedoras e sentir o pulsar de
                  uma comunidade que preserva suas raízes com orgulho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-azul text-xs md:text-sm font-semibold tracking-wider uppercase">
              Índice Cultural
            </p>
            <h2 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
              Pontos Turísticos Culturais
            </h2>
            <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
              Explore os lugares que guardam a essência e a memória do Caparaó.
              Cada destino é uma experiência autêntica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {noticiasCultura.map((noticia) => (
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

      <SecaoNoticias />
    </LayoutPublic>
  );
}
