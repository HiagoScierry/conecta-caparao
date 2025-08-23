import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DefaultCardProps {
  titulo: string;
  imagemUrl: string;
  link: string;
}

export function DefaultCard({ titulo, imagemUrl, link }: DefaultCardProps) {
  const altText = `Imagem para a notícia: ${titulo}`;

  return (
    <Card className="max-w-xs overflow-hidden rounded-lg shadow-md bg-white">
      {/* Container da Imagem com o Título "Notícias" sobreposto */}
      <div className="relative w-full h-48">
      <Image
          src={imagemUrl}
          alt={altText}
          fill
          className="object-cover rounded-t-lg"
        />
        {/* Título "Notícias" sobre a imagem */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-tourism-verde text-white py-1 px-4 rounded-full text-xs font-semibold">
          Notícias
        </div>
      </div>

      <CardContent className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-bold mt-4">
          {titulo}
        </h3>
      </CardContent>

      <CardFooter className="flex justify-center p-4">
        <Button asChild className="bg-tourism-verde text-white hover:bg-tourism-verde-escuro transition-colors duration-300">
          <a href={link}>
            Leia Mais
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
