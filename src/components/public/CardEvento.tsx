import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { DescriptionSection } from "@/components/public/DescriptionSection";

interface CardEventoProps {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  localizacao: string;
  data: string;
  href: string;
}

export function CardEvento({
  titulo,
  descricao,
  imagemUrl,
  localizacao,
  data,
  href,
}: CardEventoProps) {
  const truncatedDescricao =
    descricao?.length > 160
      ? descricao.slice(0, 160) + " [...]"
      : descricao || "";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative w-full h-[220px] md:h-[240px]">
        <Image src={imagemUrl} alt={titulo} fill className="object-cover" />
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-tourism-marinho mb-3 h-[48px] md:h-[62px] overflow-hidden">
          {titulo}
        </h3>

        <div className="h-[72px] md:h-[84px] overflow-hidden">
          <DescriptionSection
            descricao={truncatedDescricao}
            align="left"
            preserveLineBreaks={false}
            className="text-tourism-cinza-escuro text-sm md:text-base leading-relaxed"
            containerClassName="items-start text-left"
          />
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-tourism-cinza-escuro">
            <MapPin className="w-4 h-4 text-tourism-azul-claro" />
            <span>{localizacao}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tourism-cinza-escuro">
            <Calendar className="w-4 h-4 text-tourism-azul-claro" />
            <span>{data}</span>
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
