"use client";
import { use } from "react";
import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Atrativos } from "@/components/public/Atrativos";
import { SecaoExperiencias } from "@/components/public/SecaoExperiencias";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { Informacoes } from "@/components/public/Informacoes";
import { useGetMunicipioById } from "@/hooks/http/useMunicipio";
import { Progress } from "@/components/ui/progress";

type Props = { params: Promise<{ id: string }> };

export default function PaginaMunicipios({ params }: Props) {
  const { id } = use(params);
  const { data: municipio, isLoading } = useGetMunicipioById(id);

  if (isLoading || !municipio) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Progress
            about="Carregando..."
            className="w-24 h-24 border-t-2 border-blue-600 solid animate-spin"
            style={{ opacity: 0.5 }}
          />
        </div>
      </LayoutPublic>
    );
  }

  const fotos = municipio.fotos?.map((foto: { url: string }) => foto.url) ?? [];

  return (
    <LayoutPublic>
      {/* Hero */}
      <Hero titulo={municipio.nome} imagemUrl={fotos[0] ?? "/landscape.svg"} />

      {/* Corpo principal */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="flex flex-col gap-10">
          <DescriptionSection
            subtitulo="Descubra"
            titulo={`O coração de ${municipio.nome}`}
            descricao={municipio.descricao || "Descrição não disponível."}
            align="left"
          />

          {fotos.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-tourism-marinho mb-4 tracking-wide">
                Galeria de Fotos
              </h2>
              <GaleriaDeImagens imagemUrls={fotos} />
            </section>
          )}
        </div>
      </div>

      <SecaoExperiencias
        tituloDestaque="O QUE TE ESPERA"
        tituloPrincipal={`Experiências Autênticas em ${municipio.nome}`}
      >
        <Atrativos />
      </SecaoExperiencias>
      <Informacoes
        contato={{
          telefone: municipio.contato?.telefone || "",
          email: municipio.contato?.email || "",
          site: municipio.site || "",
        }}
        mapa={municipio.mapaUrl ?? ""}
      />
    </LayoutPublic>
  );
}
