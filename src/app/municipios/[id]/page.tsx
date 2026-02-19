"use client";
import { use } from "react";
import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Atrativos } from "@/components/public/Atrativos";
import { SecaoExperiencias } from "@/components/public/SecaoExperiencias";
import { Informacoes } from "@/components/public/Informacoes";
import { useGetMunicipioById } from "@/hooks/http/useMunicipio";
import { Progress } from "@/components/ui/progress";
import { DescriptionSection } from "@/components/public/DescriptionSection";

type Props = {
  params: Promise<{ id: string }>;
};
export default function PaginaMunicipios({ params }: Props) {
  const { id } = use(params);

  const { data: municipio, isLoading } = useGetMunicipioById(id);

  return (
    <LayoutPublic>
      {isLoading || !municipio ? (
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
            titulo={municipio.nome}
            imagemUrl={
              municipio.fotos && municipio.fotos.length > 0
                ? municipio.fotos[0].url
                : "/landscape.svg"
            }
          />


          <section className="w-full bg-gradient-to-b from-tourism-menta/50 via-white to-white py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <DescriptionSection
                subtitulo="DESCUBRA"
                titulo={`O coração de ${municipio.nome}`}
                descricao={municipio?.descricao || "Descrição não disponível."}
                align="left"
                containerClassName="w-full"
              />
            </div>
          </section>

          <section className="w-full bg-white py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
              <div className="space-y-2">
                <p className="text-tourism-azul text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                  REGISTRE
                </p>
                <h2 className="text-tourism-marinho text-3xl md:text-4xl font-bold">
                  Galeria de Fotos
                </h2>
              </div>
              <GaleriaDeImagens
                imagemUrls={municipio.fotos.map(
                  (foto: { url: string }) => foto.url,
                )}
              />
            </div>
          </section>

          <SecaoExperiencias
            tituloDestaque="O QUE TE ESPERA"
            tituloPrincipal={`Experiências Autênticas em ${municipio.nome}`}
          >
            <Atrativos />
          </SecaoExperiencias>

          <Informacoes
            contato={{
              telefone: municipio.contato.telefone,
              email: municipio.contato.email,
              site: municipio.site || "Site não disponível.",
            }}
            mapa={municipio.mapaUrl ?? undefined}
          />
        </>
      )}
    </LayoutPublic>
  );
}
