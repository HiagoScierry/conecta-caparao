import Link from "next/link";
import { CardAtrativoDestaque } from "./CardAtrativoDestaque";
import { CardAtrativoMini } from "./CardAtrativoMini";
import { Button } from "@/components/ui/button";

export function GaleriaAtrativos() {
  const atrativoDestaque = {
    titulo: "Pico da Bandeira",
    descricao: "2.892 metros de altitude com vista panorâmica única",
    imagemUrl: "/atraction01.jpg",
    href: "/atrativos/1",
  };

  const atrativosMini = [
    {
      titulo: "Mirantes",
      descricao: "Pontos estratégicos para fotos incríveis",
      imagemUrl: "/atraction02.jpg",
      href: "/atrativos/mirantes",
    },
    {
      titulo: "Trilhas",
      descricao: "Percursos diversos para todos os níveis",
      imagemUrl: "/atraction03.jpg",
      href: "/atrativos/trilhas",
    },
    {
      titulo: "Nascer do Sol",
      descricao: "Viva a experiência de um amanhecer inesquecível",
      imagemUrl: "/atraction01.jpg",
      href: "/atrativos/nascer-sol",
    },
    {
      titulo: "Cachoeiras",
      descricao: "Águas cristalinas em meio à natureza",
      imagemUrl: "/atraction02.jpg",
      href: "/atrativos/cachoeiras",
    },
  ];

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
          <CardAtrativoDestaque {...atrativoDestaque} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {atrativosMini.map((atrativo, index) => (
              <CardAtrativoMini key={index} {...atrativo} />
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
