"use client";
import React from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CardEvento } from "@/components/public/CardEvento";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useEvento, useGetEventoById } from "@/hooks/http/useEvento";
import { Progress } from "@/components/ui/progress";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PaginaEvento({ params }: Props) {
  const { id } = use(params);

  const { data: eventos } = useEvento();
  const { data: evento, isLoading } = useGetEventoById(Number(id));

  return (
    <LayoutPublic>
      {isLoading ? (
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
          <main className="container mx-auto px-4 py-8 md:py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
              <h1 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {evento?.nome}
              </h1>

              <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-6">
                <Image
                  src={evento?.fotos?.[0]?.foto?.url || "/landscape.svg"}
                  alt={evento?.nome || "Imagem do evento"}
                  width={1600}
                  height={960}
                  className="object-cover w-full h-[420px] md:h-[520px]"
                />
              </div>

              <div className="w-full text-tourism-cinza text-base md:text-lg leading-relaxed">
                {evento?.descricao ? (
                  <DescriptionSection
                    descricao={evento.descricao}
                    align="left"
                    preserveLineBreaks={false}
                    className="text-tourism-cinza text-base md:text-lg leading-relaxed"
                    containerClassName="items-start text-left"
                  />
                ) : (
                  <p>Resumo não disponível.</p>
                )}
              </div>
            </div>

            <section className="w-full bg-white py-12">
              <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-tourism-marinho text-3xl md:text-4xl font-bold">
                    Galeria de Fotos
                  </h2>
                </div>
                <GaleriaDeImagens
                  imagemUrls={evento?.fotos?.map((f) => f.foto.url) || []}
                />
              </div>
            </section>

            <section className="w-full bg-white py-12">
              <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-tourism-marinho text-3xl md:text-4xl font-bold">
                    Mais Eventos
                  </h2>

                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {eventos
                        ?.filter((e: EventoFull) => e.id !== evento?.id)
                        .sort(
                          (a: EventoFull, b: EventoFull) =>
                            new Date(b.data).getTime() -
                            new Date(a.data).getTime(),
                        )
                        .slice(0, 3)
                        .map((e: EventoFull) => (
                          <CardEvento
                            key={e.id}
                            titulo={e.nome}
                            descricao={e.descricao ?? ""}
                            imagemUrl={
                              e.fotos?.[0]?.foto?.url ||
                              "/eventos/placeholder.jpg"
                            }
                            data={new Date(e.data).toLocaleDateString("pt-BR")}
                            localizacao={e.municipio?.nome || ""}
                            href={`/eventos/${e.id}`}
                          />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                      <Button
                        asChild
                        className="bg-tourism-marinho hover:bg-tourism-marinho/90 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <Link
                          href="/eventos"
                          className="flex items-center gap-2"
                        >
                          Ver Todos os Eventos
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </LayoutPublic>
  );
}
