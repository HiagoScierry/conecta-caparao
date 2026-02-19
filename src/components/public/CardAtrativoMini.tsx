import Image from "next/image";
import Link from "next/link";

interface CardAtrativoMiniProps {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  href: string;
}

export function CardAtrativoMini({ titulo, descricao, imagemUrl, href }: CardAtrativoMiniProps) {
  return (
    <Link href={href}>
      <div className="relative w-full h-[250px] md:h-[280px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {titulo}
          </h3>
          <p className="text-xs md:text-sm text-white/85">
            {descricao}
          </p>
        </div>
      </div>
    </Link>
  );
}
