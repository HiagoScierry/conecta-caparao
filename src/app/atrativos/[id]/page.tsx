"use client";
import { use } from "react";
import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Informacoes } from "@/components/public/Informacoes";
import { useGetAtrativoById } from "@/hooks/http/useAtrativos";
import { Progress } from "@/components/ui/progress";
import { DescriptionSection } from "@/components/public/DescriptionSection";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PageAtrativo({ params }: Props) {
  const { id } = use(params);
  const { data: atrativo, isLoading } = useGetAtrativoById(Number(id));

  return (
    <LayoutPublic>
      {isLoading || !atrativo ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Progress
            about="Carregando..."
            className="w-24 h-24 border-t-2 border-blue-600 solid animate-spin"
            style={{
              opacity: 0.5,
            }}
          />
        </div>
      ) : (
        <>
          <Hero
            titulo={atrativo.nome}
            imagemUrl={
              atrativo.fotos && atrativo.fotos.length > 0
                ? atrativo.fotos[0].foto.url
                : "/landscape.svg"
            }
          />

          <section className="w-full bg-gradient-to-b from-tourism-menta/50 via-white to-white py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <DescriptionSection
                subtitulo="DESCUBRA"
                titulo={`Conheça ${atrativo.nome}`}
                descricao={atrativo?.descricao || "Descrição não disponível."}
                align="left"
                containerClassName="w-full"
              />
            </div>
          </section>

          <section className="w-full bg-white py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
              <div className="space-y-2">
                <h2 className="text-tourism-marinho text-3xl md:text-4xl font-bold">
                  Galeria de Fotos
                </h2>
              </div>
              <GaleriaDeImagens
                imagemUrls={atrativo.fotos.map(
                  (foto: { foto: { url: string } }) => foto.foto.url,
                )}
              />
            </div>
          </section>

          <Informacoes
            contato={{
              telefone: atrativo.contato?.telefone || "",
              email: atrativo.contato?.email || "",
              site: atrativo.contato?.instagram || "",
            }}
            mapa={atrativo.mapaUrl ?? undefined}
            perfis={atrativo.perfis || []}
            categorias={atrativo.categorias || []}
            subcategorias={atrativo.subcategorias || []}
          />
        </>
      )}
    </LayoutPublic>
  );
}
