import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardAtrativoDestaqueProps {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  href: string;
}

export function CardAtrativoDestaque({ titulo, descricao, imagemUrl, href }: CardAtrativoDestaqueProps) {
  return (
    <Link href={href}>
      <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
            {titulo}
          </h3>
          <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 max-w-xl">
            {descricao}
          </p>
          <Button className="bg-white text-tourism-marinho hover:bg-white/90 font-semibold px-6 py-2.5 rounded-lg">
            Explorar Agora
          </Button>
        </div>
      </div>
    </Link>
  );
}
