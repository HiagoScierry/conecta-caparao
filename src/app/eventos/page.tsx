"use client";
import { CardEvento } from "@/components/public/CardEvento";
import { LayoutPublic } from "@/components/public/Layout";
import { useEvento } from "@/hooks/http/useEvento";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";
import { Loader2 } from "lucide-react";

export default function PaginaEventos() {
  const {
    data: eventos,
    isLoading,
    isError,
  } = useEvento() as {
    data?: EventoFull[];
    isLoading: boolean;
    isError: boolean;
    error?: unknown;
  };

  return (
    <LayoutPublic>
      <div className="bg-gradient-to-b from-tourism-menta via-white to-white py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-verde text-xs md:text-sm font-semibold tracking-wider uppercase">
              EVENTOS
            </p>
            <h1 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
              Eventos e Experiências
            </h1>
            <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
              Participe dos melhores momentos da região do Caparaó
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="w-12 h-12 text-tourism-verde animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-red-600">
                Erro ao carregar eventos. Tente novamente mais tarde.
              </p>
            </div>
          ) : eventos && eventos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventos.map((evento: EventoFull) => (
                <CardEvento
                  key={evento.id}
                  titulo={evento.nome}
                  descricao={evento.descricao ?? ""}
                  imagemUrl={
                    evento?.fotos?.[0]?.foto?.url || "/eventos/placeholder.jpg"
                  }
                  data={new Date(evento.data).toLocaleDateString("pt-BR")}
                  localizacao={evento.municipio?.nome || ""}
                  href={`/eventos/${evento.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-tourism-cinza-escuro">
              Nenhum evento encontrado.
            </div>
          )}
        </div>
      </div>
    </LayoutPublic>
  );
}
