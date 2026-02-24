"use client";

import { LayoutPublic } from "@/components/public/Layout";
import { Atrativos } from "@/components/public/Atrativos";
import { Hero } from "@/components/public/Hero";
import { SecaoExperiencias } from "@/components/public/SecaoExperiencias";
import { GaleriaAtrativos } from "@/components/public/GaleriaAtrativos";
import { SecaoEventos } from "@/components/public/SecaoEventos";
import { SecaoMunicipios } from "@/components/public/SecaoMunicipios";
import { SecaoMomentos } from "@/components/public/SecaoMomentos";
import { SecaoNoticias } from "@/components/public/SecaoNoticias";
import { useGetAllAtrativos } from "@/hooks/http/useAtrativos";
import { useEvento } from "@/hooks/http/useEvento";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { useGetNoticias } from "@/hooks/http/useNoticia";

export default function Home() {
  const { data: atrativos, isLoading: isLoadingAtrativos } = useGetAllAtrativos();
  const { data: eventos, isLoading: isLoadingEventos } = useEvento();
  const { data: municipios, isLoading: isLoadingMunicipios } = useGetAllMunicipios();
  const { data: noticias, isLoading: isLoadingNoticias } = useGetNoticias();

  return (
    <LayoutPublic>
      <Hero 
        titulo="As Raízes do Caparaó"
        subtitulo="Uma história tecida nas montanhas, preservada pelo coração do povo"
        imagemUrl="/Hero.jpg"
      />

      <SecaoExperiencias 
        tituloDestaque="O QUE TE ESPERA"
        tituloPrincipal="Experiências Autênticas"
      >
        <Atrativos />
      </SecaoExperiencias>

      <GaleriaAtrativos
        atrativos={atrativos ?? []}
        isLoading={isLoadingAtrativos}
      />

      <SecaoEventos
        eventos={eventos ?? []}
        isLoading={isLoadingEventos}
      />

      <SecaoMunicipios
        municipios={municipios ?? []}
        isLoading={isLoadingMunicipios}
      />

      <SecaoMomentos />

      <SecaoNoticias
        noticias={noticias ?? []}
        isLoading={isLoadingNoticias}
      />
    </LayoutPublic>
  );
}
