import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

interface CardEventoProps {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  localizacao: string;
  data: string;
  badge?: string;
  href: string;
}

export function CardEvento({ titulo, descricao, imagemUrl, localizacao, data, badge, href }: CardEventoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative w-full h-[220px] md:h-[240px]">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-tourism-rosa-claro text-tourism-marinho text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
            {badge}
          </div>
        )}
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-tourism-marinho mb-3">
          {titulo}
        </h3>
        
        <p className="text-sm md:text-base text-tourism-cinza-escuro leading-relaxed mb-4 flex-grow">
          {descricao}
        </p>
        
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-tourism-cinza-escuro">
            <Calendar className="w-4 h-4 text-tourism-azul-claro" />
            <span>{data}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tourism-cinza-escuro">
            <MapPin className="w-4 h-4 text-tourism-azul-claro" />
            <span>{localizacao}</span>
          </div>
        </div>
        
        <Link href={href} className="w-full">
          <Button className="w-full bg-tourism-marinho hover:bg-tourism-marinho/90 text-white font-semibold py-2.5 rounded-lg">
            Saiba Mais
          </Button>
        </Link>
      </div>
    </div>
  );
}
