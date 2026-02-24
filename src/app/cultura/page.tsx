"use client";

import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { CardNoticia } from "@/components/public/CardNoticia";
import { useGetAllAtrativos, AtracaoTuristicaLoadedData } from "@/hooks/http/useAtrativos";

function getCoverUrl(atrativo: AtracaoTuristicaLoadedData): string {
  const capa = atrativo.fotos.find(f => f.capa);
  return capa?.foto?.url ?? atrativo.fotos[0]?.foto?.url ?? "/atraction01.jpg";
}

export default function CulturaPage() {
  const { data: atrativos, isLoading } = useGetAllAtrativos();

  const atrativosCulturais = atrativos?.filter(atrativo =>
    atrativo.categorias.some(cat =>
      cat.nome.toLowerCase().includes("cultura") ||
      cat.nome.toLowerCase().includes("turismo")
    )
  )?.slice(0, 3) ?? [];

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
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                    <div className="w-full h-[240px] md:h-[260px] bg-gray-200 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>
                  </div>
                ))
              : atrativosCulturais.map((atrativo) => (
                  <CardNoticia
                    key={atrativo.id}
                    titulo={atrativo.nome}
                    descricao={atrativo.descricao ?? ""}
                    imagemUrl={getCoverUrl(atrativo)}
                    data={atrativo.municipio?.nome ?? ""}
                    href={`/atrativos/${atrativo.id}`}
                  />
                ))}
          </div>
        </div>
      </section>
    </LayoutPublic>
  );
}
