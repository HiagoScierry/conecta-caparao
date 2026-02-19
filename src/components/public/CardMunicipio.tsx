import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CardMunicipioProps {
  nome: string;
  descricao: string;
  imagemUrl: string;
  href: string;
}

export function CardMunicipio({ nome, descricao, imagemUrl, href }: CardMunicipioProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative h-[280px] md:h-[320px] overflow-hidden">
        <Image
          src={imagemUrl}
          alt={nome}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-tourism-cinza-escuro shadow-md">
            📍 {nome}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-tourism-cinza-escuro text-sm md:text-base leading-relaxed">
          {descricao}
        </p>
        <Button
          asChild
          variant="ghost"
          className="w-full bg-tourism-menta hover:bg-tourism-verde hover:text-white text-tourism-verde font-semibold group/button transition-all"
        >
          <a href={href} className="flex items-center justify-center gap-2">
            Explorar {nome}
            <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
}
