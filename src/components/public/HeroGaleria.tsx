"use client";

import * as React from "react";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface HeroGaleriaProps {
  nome?: string;
  imagemUrls?: string[];
}

export function HeroGaleria({ nome, imagemUrls = [] }: HeroGaleriaProps) {
  if (!imagemUrls || imagemUrls.length === 0) {
    return (
      <div className="relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-200">
        <h1 className="text-tourism-cinza text-4xl md:text-6xl lg:text-8xl font-bold">{nome}</h1>
      </div>
    );
  }

  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      className="relative h-[400px] md:h-[500px] lg:h-[600px]"
    >
      <CarouselContent>
        {imagemUrls.map((url, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="absolute inset-0">
              <Image
                src={url}
                alt={`Imagem do município de ${nome}`}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 lg:p-36">
                <h1 className="text-tourism-cinza text-4xl md:text-6xl lg:text-8xl font-bold">{nome}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
