  import Image from "next/image";
import React from "react";

  interface HeroProps {
    nome?: string;
    imagemUrl?: string;
  }

  export function Hero({ nome, imagemUrl }: HeroProps) {
    return (
      <div className="relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
        <div className="absolute inset-0">
          <Image
            src={imagemUrl || "/landscape.svg"}
            alt={`Imagem do município de ${nome}`}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 lg:p-36">
          <h1 className="text-tourism-cinza  text-4xl md:text-6xl lg:text-8xl font-bold">{nome}</h1>
        </div>
      </div>
    );
  }
