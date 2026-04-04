"use client";
import Image from "next/image";
import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Informacoes } from "@/components/public/Informacoes";
import { Badge } from "@/components/ui/badge";
import { useGetAtrativoById } from "@/hooks/http/useAtrativos";
import { Progress } from "@/components/ui/progress";

type Props = { params: Promise<{ id: string }> };

export default function PageAtrativo({ params }: Props) {
  const { id } = params as unknown as { id: string };
  const { data: atrativo, isLoading } = useGetAtrativoById(Number(id));

  if (isLoading) {
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

  if (!atrativo) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-gray-600">
            Atrativo não encontrado
          </h1>
        </div>
      </LayoutPublic>
    );
  }

  const fotos = atrativo.fotos?.map((foto) => foto.foto.url) ?? [];
  const heroUrl = fotos[0] ?? null;

  const hasBadges =
    (atrativo.perfis?.length ?? 0) > 0 ||
    (atrativo.categorias?.length ?? 0) > 0 ||
    (atrativo.subcategorias?.length ?? 0) > 0;

  return (
    <LayoutPublic>
      {/* Hero */}
      <section className="relative w-full h-[60vh] bg-tourism-marinho overflow-hidden">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={`Foto principal de ${atrativo.nome}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tourism-marinho/90 via-tourism-marinho/50 to-tourism-marinho/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-12 text-center">
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-tourism-menta mb-3">
            Atrativo turístico
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight drop-shadow-lg">
            {atrativo.nome}
          </h1>
        </div>
      </section>

      {/* Corpo principal */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="flex flex-col gap-10">
          <DescriptionSection
            subtitulo="Descubra"
            titulo={atrativo.nome}
            descricao={atrativo.descricao || ""}
            align="left"
          />

          {hasBadges && (
            <section>
              <h2 className="text-xl font-bold text-tourism-marinho mb-4 tracking-wide">
                Perfil de Visitantes
              </h2>
              <div className="flex flex-wrap gap-2">
                {atrativo.perfis?.map((perfil) => (
                  <Badge key={perfil.id} className="bg-tourism-azul text-white hover:bg-tourism-azul/90">
                    {perfil.nome}
                  </Badge>
                ))}
                {atrativo.categorias?.map((categoria) => (
                  <Badge key={categoria.id} className="bg-tourism-verde text-white hover:bg-tourism-verde/90">
                    {categoria.nome}
                  </Badge>
                ))}
                {atrativo.subcategorias?.map((subcategoria) => (
                  <Badge key={subcategoria.id} className="bg-tourism-marinho text-tourism-menta border border-tourism-menta/40 hover:bg-tourism-marinho/80">
                    {subcategoria.nome}
                  </Badge>
                ))}
              </div>
            </section>
          )}

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

      <Informacoes
        contato={{
          telefone: atrativo.contato?.telefone || "",
          email: atrativo.contato?.email || "",
          site: atrativo.contato?.instagram || "",
        }}
        mapa={atrativo.mapaUrl || ""}
      />
    </LayoutPublic>
  );
}
