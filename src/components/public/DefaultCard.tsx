import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DefaultCardProps {
  titulo: string;
  imagemUrl: string;
  link: string;
}

export function DefaultCard({ titulo, imagemUrl, link }: DefaultCardProps) {
  const altText = `Imagem para a notícia: ${titulo}`;

  return (
    <Card className="w-full flex flex-col overflow-hidden rounded-lg border-2 border-tourism-verde shadow-md bg-white">
      <div className="relative w-full h-48">
      <Image
          src={imagemUrl}
          alt={altText}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
        <h3 className="text-xl font-semibold leading-tight mb-4">
          {titulo}
        </h3>

        <Button asChild className="mt-auto bg-tourism-verde text-white hover:bg-tourism-branco hover:text-tourism-verde border-2  hover:border-tourism-verde rounded-full shadow-md transition-colors duration-300">
          <a href={link}>
            Leia Mais
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
