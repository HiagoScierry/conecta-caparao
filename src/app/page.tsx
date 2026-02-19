import { LayoutPublic } from "@/components/public/Layout";
import { Atrativos } from "@/components/public/Atrativos";
import { Hero } from "@/components/public/Hero";
import { SecaoExperiencias } from "@/components/public/SecaoExperiencias";
import { GaleriaAtrativos } from "@/components/public/GaleriaAtrativos";
import { SecaoEventos } from "@/components/public/SecaoEventos";
import { SecaoMunicipios } from "@/components/public/SecaoMunicipios";
import { SecaoMomentos } from "@/components/public/SecaoMomentos";
import { SecaoNoticias } from "@/components/public/SecaoNoticias";

export default function Home() {
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

      <GaleriaAtrativos />

      <SecaoEventos />

      <SecaoMunicipios />

      <SecaoMomentos />


      <SecaoNoticias />
      
    </LayoutPublic>
  );
}
