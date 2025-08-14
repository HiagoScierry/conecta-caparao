import { LayoutPublic } from "@/components/public/Layout";
import { Hero } from "@/components/public/Hero";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Atrativos } from "@/components/public/Atrativos";

let municipiosMock = [
  {
    id: "1",
    nome: "Alegre",
    subtitulo: "Um Tesouro na Região do Caparaó",
    descricao: "Alegre, conhecida como a \"Cidade Jardim\", é um dos encantos do Espírito Santo e faz parte da deslumbrante região do Caparaó. Com uma rica combinação de belezas naturais, história e cultura, o município é um destino ideal para quem busca tranquilidade e contato com a natureza.Alegre, conhecida como a \"Cidade Jardim\", é um dos encantos do Espírito Santo e faz parte da deslumbrante região do Caparaó. Com uma rica combinação de belezas naturais, história e cultura, o município é um destino ideal para quem busca tranquilidade e contato com a natureza.",
    imagemUrls: [
      "/landscape.svg",
      "/landscape.svg",
      "/landscape.svg",
    ],
  },
  {
    id: "2",
    nome: "Guaçuí",
    subtitulo: "Um Paraíso nas Montanhas",
    descricao: "Guaçuí é um município do estado do Espírito Santo, conhecido por suas montanhas e clima ameno.",
    imagemUrls: [
      "/landscape.svg",
      "/landscape.svg",
      "/landscape.svg",
    ],
  },
  {
    id: "3",
    nome: "Iúna",
    subtitulo: "Um Refúgio nas Montanhas",
    descricao: "Iúna é um município do estado do Espírito Santo, conhecido por suas belezas naturais e clima ameno.",
    imagemUrls: [
      "/landscape.svg",
      "/landscape.svg",
      "/landscape.svg",
    ],
  },
  {
    id: "4",
    nome: "Divino de São Lourenço",
    subtitulo: "Um Refúgio nas Montanhas",
    descricao: "Divino de São Lourenço é um município do estado do Espírito Santo, conhecido por suas montanhas e clima ameno.",
    imagemUrls: [
      "/landscape.svg",
      "/landscape.svg",
      "/landscape.svg",
    ],
  },
];

export default function PaginaMunicipios({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const municipio = municipiosMock.find(m => m.id === slug);

  if (!municipio) {
    return <div>Município não encontrado</div>;
  }

  return (
    <LayoutPublic>
      
      <Hero nome={municipio.nome} imagemUrl={municipio.imagemUrls ? municipio.imagemUrls[0] : undefined} />

      <DescriptionSection
        subtitulo={municipio.subtitulo}
        descricao={municipio.descricao}
      />
      
      <GaleriaDeImagens 
        imagemUrls={municipio.imagemUrls}
      />

    <Atrativos />
    </LayoutPublic>
  );
}