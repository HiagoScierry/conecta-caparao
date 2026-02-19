import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface CardNoticiaProps {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  categoria: string;
  data: string;
  href: string;
}

export function CardNoticia({ titulo, descricao, imagemUrl, categoria, data, href }: CardNoticiaProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="relative h-[240px] md:h-[260px] overflow-hidden">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-tourism-azul-claro px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-white shadow-md">
            {categoria}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-tourism-cinza-escuro/60 text-sm">
          <Calendar className="h-4 w-4" />
          <time dateTime={data}>{data}</time>
        </div>
        
        <h3 className="text-tourism-marinho text-xl md:text-2xl font-bold leading-tight line-clamp-2 group-hover:text-tourism-azul transition-colors">
          {titulo}
        </h3>
        
        <p className="text-tourism-cinza-escuro text-sm md:text-base leading-relaxed line-clamp-3">
          {descricao}
        </p>
        
        <a
          href={href}
          className="inline-flex items-center gap-2 text-tourism-azul hover:text-tourism-azul-claro font-semibold text-sm md:text-base group/link transition-colors"
        >
          Ler mais
          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
