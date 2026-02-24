import { Button } from "@/components/ui/button";
import { CardMunicipio } from "./CardMunicipio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MunicipioFull } from "@/repositories/interfaces/IMunicipioRepository";

interface SecaoMunicipiosProps {
  municipios: MunicipioFull[];
  isLoading: boolean;
}

export function SecaoMunicipios({ municipios, isLoading }: SecaoMunicipiosProps) {
  const municipiosExibidos = municipios.slice(0, 3);

  if (isLoading) {
    return (
      <section className="bg-tourism-marinho py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-azul-claro text-xs md:text-sm font-semibold tracking-wider uppercase">
              DESTINOS
            </p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              Municípios que Encantam
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-2xl overflow-hidden">
                <div className="w-full h-[280px] md:h-[320px] bg-white/5 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-10 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (municipiosExibidos.length === 0) return null;

  return (
    <section className="bg-tourism-marinho py-12 md:py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 space-y-3">
          <p className="text-tourism-azul-claro text-xs md:text-sm font-semibold tracking-wider uppercase">
            DESTINOS
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            Municípios que Encantam
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl">
            Cada cidade da região do Caparaó tem sua própria personalidade e histórias para contar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {municipiosExibidos.map((municipio) => (
            <CardMunicipio
              key={municipio.id}
              nome={municipio.nome}
              descricao={municipio.descricao ?? "Descubra este destino encantador na região do Caparaó"}
              imagemUrl={municipio.fotos[0]?.url ?? "/municipios/alegre.jpg"}
              href={`/municipios/${municipio.id}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-tourism-marinho hover:bg-tourism-marinho/90 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/municipios" className="flex items-center gap-2">
              Ver Todos os Municípios 🏔️
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
