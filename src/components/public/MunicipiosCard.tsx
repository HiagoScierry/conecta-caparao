import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface MunicipioCardProps {
  id: number;
  nome: string;
  imagemUrls: string[] | null | undefined;
}

export function MunicipiosCard({ id, nome, imagemUrls }: MunicipioCardProps) {
  const altText = `Imagem do município de ${nome}`;
  const imgSrc = imagemUrls?.[0] || "/landscape.svg";

  return (
      <Card className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full aspect-[4/3]">
        <Image
          src={imgSrc}
          alt={altText}
          fill // ✅ substitui layout="fill" + objectFit
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        <div className="absolute top-8 left-10 w-auto bg-white p-2 px-3 rounded-md border-2 border-tourism-verde shadow-md">
          <h3 className="text-tourism-verde-escuro text-base font-semibold">
            {nome}
          </h3>
        </div>
      </Card>
  );
}
