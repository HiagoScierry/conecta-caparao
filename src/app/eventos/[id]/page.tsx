"use client";
import React from "react";
import Image from "next/image";
import { DefaultCard } from "@/components/public/DefaultCard";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useEvento, useGetEventoById } from "@/hooks/http/useEvento";
import { Progress } from "@radix-ui/react-progress";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";

type Props = {
  params: Promise<{ id: string }>;
}

export default function PaginaEvento({ params }: Props) {
  const { id } = params as unknown as { id: string };
  const {data: eventos} =  useEvento();
  const { data: evento, isLoading } =  useGetEventoById(Number(id));

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
              {evento?.nome || "Título do Evento"}
            </h1>
          </div>

          {/* Imagem Principal */}
          <div className="relative w-full h-80 md:h-[500px] mb-8 md:mb-12">
            <Image
              src={evento?.fotos[0]?.foto.url || ""}
              alt="Parque Nacional do Caparaó"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Corpo do Texto */}
          <div className="max-w-3xl mx-auto text-lg text-tourism-cinza text-justify leading-relaxed space-y-6 mb-12 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: evento?.descricao || "Conteúdo não disponível." }} />
          </div>

          {/* Galeria de Imagens */}
          <GaleriaDeImagens imagemUrls={evento?.fotos.map(foto => foto.foto.url) || []} />

          {/* Seção "Outras Notícias" */}
          <div className="flex flex-col mx-auto md:mx-16 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-tourism-cinza mb-12">
              Outras Notícias
            </h2>

            {/* Grid de Cards de Notícia */}
            <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-12 lg:gap-24 m-auto">
              {eventos?.map((evento: EventoFull) => (
                  <DefaultCard
                    key={evento.id}
                    titulo={evento.nome}
                    imagemUrl={evento.fotos[0]?.foto.url || ""}
                    link={`/eventos/${evento.id}`}
                  />
              ))}
            </div>
          </div>
        </main>
      )}
    </LayoutPublic>
  );
}