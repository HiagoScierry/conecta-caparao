import Link from "next/link";
import { CardAtrativoDestaque } from "./CardAtrativoDestaque";
import { CardAtrativoMini } from "./CardAtrativoMini";
import { Button } from "@/components/ui/button";
import { AtracaoTuristicaLoadedData } from "@/hooks/http/useAtrativos";

interface GaleriaAtrativosProps {
  atrativos: AtracaoTuristicaLoadedData[];
  isLoading: boolean;
}

export function GaleriaAtrativos({ atrativos, isLoading }: GaleriaAtrativosProps) {
  const [destaque, ...restantes] = atrativos;
  const mini = restantes.slice(0, 4);

  const getCoverUrl = (atrativo: AtracaoTuristicaLoadedData): string => {
    const capa = atrativo.fotos.find(f => f.capa);
    return capa?.foto?.url ?? atrativo.fotos[0]?.foto?.url ?? "/atraction01.jpg";
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-left mb-10 md:mb-12">
            <p className="text-tourism-azul-claro text-sm md:text-base font-semibold uppercase tracking-wide mb-2">
              DESCUBRA
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tourism-marinho mb-3">
              Galeria de Atrativos
            </h2>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-[250px] md:h-[280px] rounded-2xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!destaque) return null;

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-left mb-10 md:mb-12">
          <p className="text-tourism-azul-claro text-sm md:text-base font-semibold uppercase tracking-wide mb-2">
            DESCUBRA
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tourism-marinho mb-3">
            Galeria de Atrativos
          </h2>
          <p className="text-base md:text-lg text-tourism-cinza-escuro max-w-3xl">
            Explore as maravilhas naturais que fazem do Caparaó um destino único
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <CardAtrativoDestaque
            titulo={destaque.nome}
            descricao={destaque.descricao ?? ""}
            imagemUrl={getCoverUrl(destaque)}
            href={`/atrativos/${destaque.id}`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {mini.map((atrativo) => (
              <CardAtrativoMini
                key={atrativo.id}
                titulo={atrativo.nome}
                descricao={atrativo.descricao ?? ""}
                imagemUrl={getCoverUrl(atrativo)}
                href={`/atrativos/${atrativo.id}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link href="/atrativos">
            <Button className="bg-transparent border-2 border-tourism-azul-claro text-tourism-azul-claro hover:bg-tourism-azul-claro hover:text-white font-semibold px-8 py-2.5 rounded-lg transition-all">
              Ver Todos os Atrativos →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
