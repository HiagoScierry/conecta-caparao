"use client";
import { DefaultCard } from "@/components/public/DefaultCard";
import { DefaultHeader } from "@/components/public/DefaultHeader";
import { LayoutPublic } from "@/components/public/Layout";
import { Progress } from "@/components/ui/progress";
import { useEvento } from "@/hooks/http/useEvento";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";

export default function PaginaEventos() {
  const {data: eventos, isLoading} = useEvento();


  return (
    <LayoutPublic>
       {isLoading && (
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

      {!isLoading && (
        <>
          <div className="w-full mx-auto flex justify-center items-center my-8">
            <DefaultHeader
              titulo={eventos?.[0]?.nome || "Nenhum evento encontrado"}
              imagemUrl={eventos?.[0].fotos?.[0]?.foto.url || ""}
              linkHref={`/eventos/${eventos?.[0]?.id}`}
              linkText="Ver todos os eventos"
              linkStyle="text"
            />
          </div>
          <div className="container mx-auto px-4 md:px-16 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(eventos?.length ?? 0) > 0 &&
                eventos!.map((evento: EventoFull) => (
                  <DefaultCard
                    key={evento.id}
                    titulo={evento.nome}
                    imagemUrl={evento.fotos[0]?.foto.url || ""}
                    link={`/eventos/${evento.id}`}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </LayoutPublic>
  );
}