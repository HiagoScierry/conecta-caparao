"use client";
import { DefaultCard } from "@/components/public/DefaultCard";
import { DefaultHeader } from "@/components/public/DefaultHeader";
import { LayoutPublic } from "@/components/public/Layout";
import { Progress } from "@/components/ui/progress";
import { useGetNoticias } from "@/hooks/http/useNoticia";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";

export default function PaginaNoticias() {
  const { data: noticias, isLoading } = useGetNoticias();

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
              titulo={noticias?.[0]?.titulo || "Nenhum evento encontrado"}
              imagemUrl={noticias?.[0]?.fotos[0]?.foto.url ?? ""}
              linkHref={`/eventos/${noticias?.[0]?.id}`}
              linkText="Ver todos os eventos"
              linkStyle="text"
            />
          </div>
          <div className="container mx-auto px-4 md:px-16 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(Array.isArray(noticias) && noticias.length > 0) &&
                noticias.map((noticia: NoticiaFull) => (
                  <DefaultCard
                    key={noticia.id}
                    titulo={noticia.titulo}
                    imagemUrl={noticia.fotos[0]?.foto.url}
                    link={`/noticias/${noticia.id}`}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </LayoutPublic>
  );
}
