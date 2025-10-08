import Link from "next/link";
import { faker } from "@faker-js/faker";
import { LayoutPublic } from "@/components/public/Layout";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { MunicipiosCard } from "@/components/public/MunicipiosCard";
import { Button } from "@/components/ui/button"
import { Atrativos } from "@/components/public/Atrativos";
import { DefaultCard } from "@/components/public/DefaultCard"
import Image from "next/image";

export default function Home() {
  const Carrosel = {
    imagemUrls: Array.from({ length: 5 }, () =>
      faker.image.url({ width: 640, height: 480 })
    ),
  };

  const municipios = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    nome: faker.address.city(),
    imagemUrls: [faker.image.url({ width: 640, height: 480 })],
  }));

  return (
    <LayoutPublic>
      <div className="w-full relative bg-gradient-to-t from-black/50 to-transparent">
        <Image
          src="/landscape.svg"
          alt="Foto da região do caparaó com um por do sol entre montanhas"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute max-w-3xl break-words bottom-6 md:bottom-12 lg:bottom-24 left-12 md:left-24 lg:left-48">
          <h1 className="font-bold text-3xl md:text-6xl lg:text-9xl text-tourism-branco">CAPARAÓ</h1>
          <p className="font-semibold  md:text-3xl lg:text-5xl text-tourism-rosa">
            O Paraíso Natural do Espirito Santo
          </p>
        </div>
      </div>

      <div className="w-full mx-auto my-8">
        <GaleriaDeImagens imagemUrls={Carrosel.imagemUrls} />
      </div>

      <div className="w-full relative bg-gradient-to-t from-black/50 to-transparent">
        <Image
          src="/landscape.svg"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          alt="Foto da região do caparaó com um por do sol entre montanhas"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center text-center pt-12 mx-4">          
          <div className="max-w-3xl">
            <h1 className="text-center font-bold text-xl md:text-3xl lg:text-5xl text-tourism-branco pb-4 lg:pb-8">
              Natureza, Cultura e Aventura no Espírito Santo
            </h1>
            <p className="text-center font-semibold md:text-xl lg:text-3xl text-tourism-branco">
              Um destino onde os picos das montanhas tocam o céu, as cachoeiras refrescam a alma e a cultura local conta histórias centenárias, 
              <span className="text-tourism-rosa">Venha descobrir um pedaço do Brasil que vai te surpreender.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto py-8 md:py-16 px-4 md:px-16">
        <div className="w-full mx-auto font-bold text-5xl text-tourism-cinza text-center">Municípios</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 my-8">
          {municipios.map((municipio) => (
            <Link key={municipio.id} href={`/municipios/${municipio.id}`} passHref>
              <MunicipiosCard
                nome={municipio.nome}
                imagemUrls={municipio.imagemUrls}
                id={municipio.id}
              />
            </Link>
          ))}
        </div>
        <div className="w-full mx-auto text-center">
          <Link href={"/municipios"}>
            <Button className="bg-tourism-verde border-2 border-tourism-verde hover:bg-tourism-branco hover:text-tourism-verde">Mais Municípios</Button>
          </Link>
        </div>
      </div>

      <div className="w-full bg-tourism-branco py-12">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-tourism-cinza text-3xl md:text-5xl font-bold pb-1">BEM-VINDO(A)</h2>
          <p className="text-tourism-cinza text-2xl md:text-4xl pb-12 ">AO CAPARAÓ</p>
          <Atrativos />
        </div>
      </div>

      <div className="flex flex-col mx-8 md:mx-16 lg:mx-32 my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tourism-cinza mb-12">
          Outras Notícias
        </h2>
      
        <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-12 lg:gap-24 m-auto mb-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <DefaultCard
              key={index}
              titulo="Caparaó é Destaque Nacional em Observação de Aves"
              imagemUrl={faker.image.url({ width: 640, height: 480 })}
              link={`/noticias/${index + 1}`}
              />
          ))}
        </div>
        <div className="text-center">
          <Link href="/noticias">
            <Button className="text-lg px-8 py-6 bg-tourism-verde text-white hover:bg-tourism-verde/80 transition-colors duration-300">
              Notícias
            </Button>
          </Link>
        </div>
      </div>
      

    </LayoutPublic>
  );
}
