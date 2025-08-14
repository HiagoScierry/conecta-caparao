"use client";

import * as React from "react";
import Image from "next/image"; 

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// A interface que você definiu
export interface GaleriaDeImagensProps {
  imagemUrls?: string[];
}

export function GaleriaDeImagens({ imagemUrls = [] }: GaleriaDeImagensProps) {
  if (!imagemUrls || imagemUrls.length === 0) {
    return (
      <div className="flex items-center justify-center p-10 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Nenhuma imagem para exibir.</p>
      </div>
    );
  }

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      
      className="py-12 w-full max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto"
    >
      <CarouselContent>
        {imagemUrls.map((url, index) => (
          <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex items-center justify-center aspect-video p-0 overflow-hidden">
                  <Image
                    src={url}
                    alt={`Imagem da galeria ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}