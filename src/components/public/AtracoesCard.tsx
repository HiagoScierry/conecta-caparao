import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface AtracoesCardProps {
  id: number;
  nome: string;
  cidade: string;
  imagemUrls: string[] | null | undefined;
}

export function AtracoesCard({ id, nome, cidade, imagemUrls }: AtracoesCardProps) {
  const altText = `Imagem do atrativo ${nome}`;
  const imgSrc = imagemUrls?.[0] || "/landscape.svg";

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full aspect-[4/3] group">
      <Image
        src={imgSrc}
        alt={altText}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute top-4 left-4 w-auto bg-[#428051] text-white p-1 px-3 rounded-md shadow-md">
        <h3 className="text-sm font-semibold">
          {cidade}
        </h3>
      </div>
      <div className="absolute bottom-4 left-4">
        <h2 className="text-white text-xl font-bold drop-shadow-lg">
          {nome}
        </h2>
      </div>
    </Card>
  );
}