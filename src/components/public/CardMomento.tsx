import { LucideIcon } from "lucide-react";

interface CardMomentoProps {
  icone: LucideIcon;
  numero: string;
  titulo: string;
  descricao: string;
}

export function CardMomento({ icone: Icone, numero, titulo, descricao }: CardMomentoProps) {
  return (
    <div className="relative bg-tourism-marinho/50 border border-tourism-azul-claro/20 rounded-lg p-6 hover:bg-tourism-marinho/70 transition-all duration-300">
      {/* Borda vertical decorativa */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-tourism-azul-claro to-tourism-verde rounded-l-lg" />
      
      <div className="flex items-start gap-4">
        {/* Ícone */}
        <div className="flex-shrink-0 w-12 h-12 bg-tourism-azul-claro/10 rounded-lg flex items-center justify-center">
          <Icone className="h-6 w-6 text-tourism-azul-claro" />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 space-y-2">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            {titulo}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {descricao}
          </p>
        </div>

        {/* Número */}
        <div className="flex-shrink-0 w-10 h-10 border-2 border-tourism-azul-claro/30 rounded-full flex items-center justify-center">
          <span className="text-tourism-azul-claro font-bold text-sm">
            {numero}
          </span>
        </div>
      </div>
    </div>
  );
}
