import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DefaultCard } from "@/components/public/DefaultCard";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { faker } from "@faker-js/faker";

// URLs de imagens de exemplo. Substitua por URLs reais do seu projeto.
const mainImage = faker.image.url({ width: 1280, height: 720 });
const galleryImages = Array.from({ length: 6 }, (_, index) => faker.image.url({ width: 640, height: 480 }));

export default function PaginaNoticia() {
  return (
    <LayoutPublic>
        <main className="container mx-auto px-4 py-8 md:py-16">
          {/* Título Principal */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-tourism-azul text-center leading-tight">
              As montanhas ondulantes do Parque Nacional do Caparaó
            </h1>
          </div>

          {/* Imagem Principal */}
          <div className="relative w-full h-80 md:h-[500px] mb-8 md:mb-12">
            <Image
              src={mainImage}
              alt="Parque Nacional do Caparaó"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Corpo do Texto */}
          <div className="max-w-3xl mx-auto text-lg text-tourism-cinza text-justify leading-relaxed space-y-6 mb-12">
            <p>
              As montanhas do Parque Nacional do Caparaó, com suas altitudes
              imponentes e paisagens deslumbrantes, são um convite para quem
              busca conexão com a natureza. Localizado na divisa entre Espírito
              Santo e Minas Gerais, o parque abriga o famoso Pico da Bandeira, o
              terceiro ponto mais alto do Brasil, além de trilhas bem
              sinalizadas, cachoeiras cristalinas e campos de altitude únicos. É
              um destino perfeito para aventureiros e amantes da contemplação.
            </p>
            <p>
              Além de sua beleza cênica, o parque é um importante refúgio da
              Mata Atlântica, protegendo espécies endêmicas e nascentes de rios
              que abastecem a região. Seja para uma caminhada tranquila, um
              banho refrescante em piscinas naturais ou para assistir ao nascer
              do sol no topo das montanhas, o Parque Nacional do Caparaó promete
              experiências inesquecíveis em meio à natureza preservada.
            </p>
          </div>

          {/* Galeria de Imagens */}
          <GaleriaDeImagens imagemUrls={galleryImages} />

          {/* Seção "Outras Notícias" */}
          <div className="flex flex-col mx-auto md:mx-16 my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-tourism-cinza mb-12">
              Outras Notícias
            </h2>

            {/* Grid de Cards de Notícia */}
            <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-12 lg:gap-24 m-auto">
              {Array.from({ length: 3 }).map((_, index) => (
                <DefaultCard
                  key={index}
                  titulo="Caparaó é Destaque Nacional em Observação de Aves"
                  imagemUrl={faker.image.url({ width: 640, height: 480 })}
                  link={`/noticias/${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Botão "Mais Notícias" */}
          <div className="text-center">
            <Link href="/noticias">
              <Button className="text-lg px-8 py-6 bg-tourism-verde text-white hover:bg-tourism-verde/80 transition-colors duration-300">
                Mais Notícias
              </Button>
            </Link>
          </div>
        </main>
    </LayoutPublic>
  );
}
