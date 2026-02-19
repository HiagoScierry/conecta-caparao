"use client";
import React from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CardNoticia } from "@/components/public/CardNoticia";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useGetNoticiaById, useGetNoticias } from "@/hooks/http/useNoticia";
import { Progress } from "@/components/ui/progress";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PaginaNoticia({ params }: Props) {
  const { id } = use(params);

  const { data: noticias } = useGetNoticias();
  const { data: noticia, isLoading } = useGetNoticiaById(Number(id));

  return (
    <LayoutPublic>
      {isLoading ? (
        <div className='flex items-center justify-center min-h-[60vh]'>
          <Progress
            about='Carregando...'
            className='w-24 h-24 border-t-2 border-blue-600 solid animate-spin'
            style={{
              opacity: 0.5,
            }}
          />
        </div>
      ) : (
        <>
          <main className='container mx-auto px-4 py-8 md:py-16'>
            <div className='container mx-auto px-6 md:px-12 lg:px-20 space-y-6'>
              <h1 className='text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
                {noticia?.titulo}
              </h1>

              <div className='w-full rounded-2xl overflow-hidden shadow-lg mb-6'>
                <Image
                  src={noticia?.fotos[0]?.foto.url || "/landscape.svg"}
                  alt={noticia?.titulo || "Imagem da notícia"}
                  width={1600}
                  height={960}
                  className='object-cover w-full h-[420px] md:h-[520px]'
                />
              </div>

              <div className='max-w-3xl text-tourism-cinza text-base md:text-lg leading-relaxed'>
                {noticia?.texto ? (
                  <p>
                    {(() => {
                      const stripped = noticia.texto.replace(/<[^>]+>/g, "");
                      return stripped.length > 600
                        ? stripped.slice(0, 600) + "..."
                        : stripped;
                    })()}
                  </p>
                ) : (
                  <p>Resumo não disponível.</p>
                )}
              </div>
            </div>

            <section className='w-full bg-white py-12'>
              <div className='container mx-auto px-6 md:px-12 lg:px-20 space-y-6'>
                <div className='space-y-2'>
                  <h2 className='text-tourism-marinho text-3xl md:text-4xl font-bold'>
                    Galeria de Fotos
                  </h2>
                </div>
                <GaleriaDeImagens
                  imagemUrls={noticia?.fotos.map((foto) => foto.foto.url) || []}
                />
              </div>
            </section>

            <section className='w-full bg-white py-12'>
              <div className='container mx-auto px-6 md:px-12 lg:px-20 space-y-6'>
                <div className='space-y-2'>
                  <h2 className='text-tourism-marinho text-3xl md:text-4xl font-bold'>
                    Mais Notícias
                  </h2>

                  <div className='mt-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                      {noticias
                        ?.filter((n: NoticiaFull) => n.id !== noticia?.id)
                        .sort(
                          (a: NoticiaFull, b: NoticiaFull) =>
                            new Date(b.data).getTime() -
                            new Date(a.data).getTime(),
                        )
                        .slice(0, 3)
                        .map((n: NoticiaFull) => (
                          <CardNoticia
                            key={n.id}
                            titulo={n.titulo}
                            descricao={
                              n.texto?.replace(/<[^>]+>/g, "").slice(0, 140) ??
                              ""
                            }
                            imagemUrl={
                              n.fotos[0]?.foto.url ||
                              "/noticias/placeholder.jpg"
                            }
                            categoria={""}
                            data={new Date(n.data).toLocaleDateString("pt-BR")}
                            href={`/noticias/${n.id}`}
                          />
                        ))}
                    </div>

                    <div className='text-center mt-10'>
                      <Button
                        asChild
                        className='bg-tourism-marinho hover:bg-tourism-marinho/90 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300'
                      >
                        <Link
                          href='/noticias'
                          className='flex items-center gap-2'
                        >
                          Ver Todas as Notícias
                          <ArrowRight className='h-5 w-5' />
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
