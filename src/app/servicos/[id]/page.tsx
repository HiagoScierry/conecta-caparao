"use client";
import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { Informacoes } from "@/components/public/Informacoes";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { useGetServicoById } from "@/hooks/http/useServicos";
import { Progress } from "@/components/ui/progress";

interface Foto {
  foto: {
    url: string;
  };
}

interface Horario {
  dia: string;
  horario: string;
}

type Props = {
  params: Promise<{ id: string }>;
}

export default function PageServico({ params }: Props) {
  const { id } = params as unknown as { id: string };
  const { data: servico, isLoading } = useGetServicoById(Number(id));

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

  if (!servico) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600">Serviço não encontrado</h1>
          </div>
        </div>
      </LayoutPublic>
    );
  }

  return (
    <LayoutPublic>
      <GaleriaDeImagens
        imagemUrls={servico.fotos?.map((foto: Foto) => foto.foto.url) || []}
      />
      <div className="flex flex-col md:flex-row p-4 lg:px-16 w-full h-full bg-tourism-branco">
        <DescriptionSection
          subtitulo={servico.nome}
          descricao={servico.descricao || ""}
          corSubtitulo={"text-tourism-azul"}
          corDescricao={"#000"}
          align="left"
        />
        <div className="md:w-1/4 h-full bg-tourism-azul mt-8">
          <h1 className="text-white text-xl p-2 border-b-2">Informações</h1>
          <div className="p-2">
            <div className="text-white mb-2">
              <strong>Município:</strong> {servico.municipio.nome}
            </div>
            {servico.site && (
              <div className="text-white mb-2">
                <strong>Site:</strong> 
                <a 
                  href={servico.site} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-blue-100 ml-1"
                >
                  Visitar
                </a>
              </div>
            )}
            {servico.horarios && servico.horarios.length > 0 && (
              <div className="text-white">
                <strong>Horários:</strong>
                <ul className="mt-1">
                  {servico.horarios.map((horario: Horario, index: number) => (
                    <li key={index} className="text-sm">
                      {horario.dia}: {horario.horario}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Informacoes
        contato={{
          telefone: servico.contato?.telefone || "",
          email: servico.contato?.email || "",
          site: servico.contato?.instagram || "",
        }}
        mapa=""
      />
    </LayoutPublic>
  );
}