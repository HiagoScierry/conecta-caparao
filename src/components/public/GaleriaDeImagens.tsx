"use client";

import * as React from "react";
import Image from "next/image";

export interface GaleriaDeImagensProps {
  imagemUrls?: string[];
}

const layoutClasses = [
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

export function GaleriaDeImagens({ imagemUrls = [] }: GaleriaDeImagensProps) {
  if (!imagemUrls || imagemUrls.length === 0) {
    return (
      <div className="flex items-center justify-center p-10 border-2 border-dashed rounded-3xl">
        <p className="text-tourism-cinza-escuro/70">Nenhuma imagem para exibir.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-6 gap-6"
      style={{ gridAutoRows: "180px" }}
    >
      {imagemUrls.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className={`col-span-6 sm:col-span-3 ${layoutClasses[index % layoutClasses.length]} relative rounded-[32px] overflow-hidden shadow-lg`}
        >
          <Image
            src={url}
            alt={`Imagem da galeria ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}