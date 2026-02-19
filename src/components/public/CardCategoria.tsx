import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CardCategoriaProps {
  titulo: string;
  descricao: string;
  icone: LucideIcon;
  href: string;
}

export function CardCategoria({ titulo, descricao, icone: Icone, href }: CardCategoriaProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full border border-gray-100 group">
        <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-tourism-azul-claro shadow-sm transition-transform duration-300 group-hover:scale-110 mb-4">
          <Icone className="h-10 w-10 md:h-12 md:w-12 text-white" />
        </div>
        
        <h3 className="font-bold text-lg md:text-xl text-tourism-marinho mb-2">
          {titulo}
        </h3>
        
        <p className="text-sm md:text-base text-tourism-cinza-escuro leading-relaxed">
          {descricao}
        </p>
      </div>
    </Link>
  );
}
