"use client";
import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { Informacoes } from "@/components/public/Informacoes";
import { Badge } from "@/components/ui/badge";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useGetAtrativoById } from "@/hooks/http/useAtrativos";
import { Progress } from "@/components/ui/progress";

type Props = {
  params: Promise<{ id: string }>;
}

export default function PageAtrativo({ params }: Props) {
  const { id } = params as unknown as { id: string };
  const { data: atrativo, isLoading } = useGetAtrativoById(Number(id));

  if (isLoading) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Progress
            about="Carregando..."
            className="w-24 h-24 border-t-2 border-blue-600 solid animate-spin"
            style={{
              opacity: 0.5,
            }}
          />
        </div>
      </LayoutPublic>
    );
  }

  if (!atrativo) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600">Atrativo não encontrado</h1>
          </div>
        </div>
      </LayoutPublic>
    );
  }

  return (
    <LayoutPublic>
      <GaleriaDeImagens
        imagemUrls={atrativo.fotos?.map(foto => foto.foto.url) || []}
      />
      <div className="flex flex-col md:flex-row p-4 lg:px-16 w-full h-full bg-tourism-branco">
        <DescriptionSection
          subtitulo={atrativo.nome}
          descricao={atrativo.descricao || ""}
          align="left"
        />
        <div className="md:w-1/4 h-full bg-tourism-azul mt-8">
          <h1 className="text-white text-xl p-2 border-b-2">Perfil</h1>
          <div className="p-2">
            {atrativo.perfis?.map((perfil) => (
              <Badge
                key={perfil.id}
                className="m-1"
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                }}
              >
                {perfil.nome}
              </Badge>
            ))}
            {atrativo.categorias?.map((categoria) => (
              <Badge
                key={categoria.id}
                className="m-1"
                style={{
                  backgroundColor: "#16a34a",
                  color: "#fff",
                }}
              >
                {categoria.nome}
              </Badge>
            ))}
            {atrativo.subcategorias?.map((subcategoria) => (
              <Badge
                key={subcategoria.id}
                className="m-1"
                style={{
                  backgroundColor: "#dc2626",
                  color: "#fff",
                }}
              >
                {subcategoria.nome}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Informacoes
        contato={{
          telefone: atrativo.contato?.telefone || "",
          email: atrativo.contato?.email || "",
          site: atrativo.contato?.instagram || "",
        }}
        mapa={atrativo.mapaUrl || ""}
      />
    </LayoutPublic>
  );
}
