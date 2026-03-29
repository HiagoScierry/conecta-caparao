import Link from "next/link";
import { CardEvento } from "./CardEvento";
import { Button } from "@/components/ui/button";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";

interface SecaoEventosProps {
  eventos: EventoFull[];
  isLoading: boolean;
}

function formatEventDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function SecaoEventos({ eventos, isLoading }: SecaoEventosProps) {
  const eventosExibidos = eventos.slice(0, 3);

  if (isLoading) {
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="w-full h-[220px] md:h-[240px] bg-gray-200 animate-pulse" />
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (eventosExibidos.length === 0) return null;

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
          {eventosExibidos.map((evento) => {
            const capa = evento.fotos.find(f => f.capa);
            const imagemUrl = capa?.foto?.url ?? evento.fotos[0]?.foto?.url ?? "/eventos/evento01.jpg";

            return (
              <CardEvento
                key={evento.id}
                titulo={evento.nome}
                descricao={evento.descricao ?? ""}
                imagemUrl={imagemUrl}
                localizacao={evento.municipio?.nome ?? ""}
                data={formatEventDate(evento.data)}
                href={`/eventos/${evento.id}`}
              />
            );
          })}
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
