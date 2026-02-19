"use client";
import { CardMunicipio } from "@/components/public/CardMunicipio";
import { LayoutPublic } from "@/components/public/Layout";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { MunicipioFull } from "@/repositories/interfaces/IMunicipioRepository";
import { Loader2 } from "lucide-react";

export default function PaginaMunicipios() {
  const { data: municipios } = useGetAllMunicipios() as {
    data: MunicipioFull[];
  };

  return (
    <LayoutPublic>
      <div className="bg-gradient-to-b from-tourism-menta via-white to-white py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-verde text-xs md:text-sm font-semibold tracking-wider uppercase">
              DESTINOS PARA EXPLORAR
            </p>
            <h1 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
              Municípios do Caparaó
            </h1>
            <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
              Conheça os municípios que formam a região do Caparaó, cada um com suas particularidades e histórias únicas
            </p>
          </div>

          {municipios ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {municipios.map((municipio: MunicipioFull) => (
                <CardMunicipio
                  key={municipio.id}
                  nome={municipio.nome}
                  descricao="Portal do Caparaó com charme histórico e cultura cafeeira"
                  imagemUrl={municipio.fotos[0]?.url || "/municipios/placeholder.jpg"}
                  href={`/municipios/${municipio.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="w-12 h-12 text-tourism-verde animate-spin" />
            </div>
          )}
        </div>
      </div>
    </LayoutPublic>
  );
}
