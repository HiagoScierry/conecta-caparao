"use client";
import React from "react";
import Image from "next/image";
import { DefaultCard } from "@/components/public/DefaultCard";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useGetNoticiaById, useGetNoticias } from "@/hooks/http/useNoticia";
import { Progress } from "@/components/ui/progress";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";

// URLs de imagens de exemplo. Substitua por URLs reais do seu projeto.

export default function PaginaNoticia({ params }: { params: { id: string } }) {
  const { data: noticias } = useGetNoticias();
  const { data: noticia, isLoading } = useGetNoticiaById(Number(params.id));

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
        <main className="container mx-auto px-4 py-8 md:py-16">
          {/* Título Principal */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-tourism-azul text-center leading-tight">
              {noticia?.titulo}
            </h1>
          </div>

          {/* Imagem Principal */}
          <div className="relative w-full h-80 md:h-[500px] mb-8 md:mb-12">
            <Image
              src={noticia?.fotos[0]?.foto.url || ""}
              alt="Parque Nacional do Caparaó"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Corpo do Texto */}
          <div className="max-w-3xl mx-auto text-lg text-tourism-cinza text-justify leading-relaxed space-y-6 mb-12">
            <p>
              {noticia?.texto || "Conteúdo não disponível."}
            </p>
          </div>

          {/* Galeria de Imagens */}
          <GaleriaDeImagens imagemUrls={noticia?.fotos.map(foto => foto.foto.url) || []} />

          {/* Seção "Outras Notícias" */}
          <div className="flex flex-col mx-auto md:mx-16 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-tourism-cinza mb-12">
              Outras Notícias
            </h2>

            {/* Grid de Cards de Notícia */}
            <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-12 lg:gap-24 m-auto">
              {noticias?.map((noticia: NoticiaFull) => (
                  <DefaultCard
                    key={noticia.id}
                    titulo={noticia.titulo}
                    imagemUrl={noticia.fotos[0]?.foto.url || ""}
                    link={`/noticias/${noticia.id}`}
                  />
              ))}
            </div>
          </div>
        </main>
      )}
    </LayoutPublic>
  );
}
