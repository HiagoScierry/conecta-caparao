import Link from "next/link";
import { CardEvento } from "./CardEvento";
import { Button } from "@/components/ui/button";

export function SecaoEventos() {
  const eventos = [
    {
      titulo: "Festival de Inverno do Caparaó",
      descricao: "Celebração da cultura local com artesanato da região",
      imagemUrl: "/eventos/evento01.jpg",
      localizacao: "Alto Caparaó, MG",
      data: "06/07",
      badge: "Evento Especial",
      href: "/eventos/1",
    },
    {
      titulo: "Travessia do Pico da Bandeira",
      descricao: "Expedição guiada ao terceiro pico mais alto do Brasil com o nascer do sol",
      imagemUrl: "/eventos/evento02.jpg",
      localizacao: "Parque Nacional",
      data: "01/07 a 31/12",
      badge: "De 01 a 31/12",
      href: "/eventos/2",
    },
    {
      titulo: "Circuito das Cachoeiras",
      descricao: "Trilha guiada pelas principais cachoeiras da região com banho refrescante",
      imagemUrl: "/eventos/evento03.jpg",
      localizacao: "Dores do Rio Preto, ES",
      data: "06/07",
      badge: "Experiência",
      href: "/eventos/3",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-left mb-10 md:mb-12">
          <p className="text-tourism-azul-claro text-sm md:text-base font-semibold uppercase tracking-wide mb-2">
            PRÓXIMOS ACONTECIMENTOS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tourism-marinho mb-3">
            Eventos e Experiências
          </h2>
          <p className="text-base md:text-lg text-tourism-cinza-escuro max-w-3xl">
            Participe dos melhores momentos da região do Caparaó
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventos.map((evento, index) => (
            <CardEvento key={index} {...evento} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link href="/eventos">
            <Button className="bg-transparent border-2 border-tourism-azul-claro text-tourism-azul-claro hover:bg-tourism-azul-claro hover:text-white font-semibold px-8 py-2.5 rounded-lg transition-all">
              Ver Todos os Eventos →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
