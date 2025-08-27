"use client";
import { MunicipiosCard } from "@/components/public/MunicipiosCard";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import Link from "next/link";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { MunicipioFull } from "@/repositories/interfaces/IMunicipioRepository";
import { Progress } from "@/components/ui/progress";

export default function PaginaMunicipios() {
  const { data: municipios } = useGetAllMunicipios() as {
    data: MunicipioFull[];
  };

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="Municípios" cor="bg-tourism-verde" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-8">
          {municipios?.map((municipio: MunicipioFull) => (
            <Link
              key={municipio.id}
              href={`/municipios/${municipio.id}`}
              passHref
            >
              <MunicipiosCard
                nome={municipio.nome}
                imagemUrls={municipio.fotos.map((foto) => foto.url)}
                id={municipio.id}
              />
            </Link>
          )) || (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Progress
                about="Carregando..."
                className="w-24 h-24 border-t-2 border-blue-600 solid animate-spin"
                style={{
                  opacity: 0.5,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </LayoutPublic>
  );
}
