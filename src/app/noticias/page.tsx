"use client";
import { CardNoticia } from "@/components/public/CardNoticia";
import { LayoutPublic } from "@/components/public/Layout";
import { useGetNoticias } from "@/hooks/http/useNoticia";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";
import { Loader2 } from "lucide-react";

export default function PaginaNoticias() {
  const { data: noticias } = useGetNoticias() as { data: NoticiaFull[] };

  return (
    <LayoutPublic>
      <div className="bg-gradient-to-b from-tourism-menta via-white to-white py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 space-y-3">
            <p className="text-tourism-verde text-xs md:text-sm font-semibold tracking-wider uppercase">
              Descubra
            </p>
            <h1 className="text-tourism-marinho text-4xl md:text-5xl lg:text-6xl font-bold">
              O Que Acontece no Caparaó
            </h1>
            <p className="text-tourism-cinza-escuro text-base md:text-lg max-w-3xl">
              Fique por dentro das últimas novidades, e descobertas da nossa
              região
            </p>
          </div>

          {noticias ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia: NoticiaFull) => (
                <CardNoticia
                  key={noticia.id}
                  titulo={noticia.titulo}
                  descricao={noticia.texto ?? ""}
                  imagemUrl={
                    noticia.fotos[0]?.foto.url || "/noticias/placeholder.jpg"
                  }
                  categoria={""}
                  data={new Date(noticia.data).toLocaleDateString("pt-BR")}
                  href={`/noticias/${noticia.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="w-12 h-12 text-tourism-verde animate-spin" />
            </div>
          )}
        </div>
      </div>
    </LayoutPublic>
  );
}
