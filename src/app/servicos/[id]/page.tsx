"use client";
import Image from "next/image";
import { Clock } from "lucide-react";
import { LayoutPublic } from "@/components/public/Layout";
import { DescriptionSection } from "@/components/public/DescriptionSection";
import { GaleriaDeImagens } from "@/components/public/GaleriaDeImagens";
import { Informacoes } from "@/components/public/Informacoes";
import { useGetServicoById } from "@/hooks/http/useServicos";
import { Progress } from "@/components/ui/progress";

interface Foto {
  foto: { url: string };
}

interface Horario {
  dia: string;
  horario: string;
}

type Props = { params: Promise<{ id: string }> };

const DIAS_ORDEM = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"];

const DIAS_LABEL: Record<string, string> = {
  SEGUNDA: "Segunda-feira",
  TERCA: "Terça-feira",
  QUARTA: "Quarta-feira",
  QUINTA: "Quinta-feira",
  SEXTA: "Sexta-feira",
  SABADO: "Sábado",
  DOMINGO: "Domingo",
};

const DIAS_ABREV: Record<string, string> = {
  SEGUNDA: "Seg",
  TERCA: "Ter",
  QUARTA: "Qua",
  QUINTA: "Qui",
  SEXTA: "Sex",
  SABADO: "Sáb",
  DOMINGO: "Dom",
};

// getDay() retorna 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb
const DIA_SEMANA_HOJE: Record<number, string> = {
  0: "DOMINGO",
  1: "SEGUNDA",
  2: "TERCA",
  3: "QUARTA",
  4: "QUINTA",
  5: "SEXTA",
  6: "SABADO",
};

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
            style={{ opacity: 0.5 }}
          />
        </div>
      </LayoutPublic>
    );
  }

  if (!servico) {
    return (
      <LayoutPublic>
        <div className="flex items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-gray-600">
            Serviço não encontrado
          </h1>
        </div>
      </LayoutPublic>
    );
  }

  const fotos = servico.fotos?.map((foto: Foto) => foto.foto.url) ?? [];
  const heroUrl = fotos[0] ?? null;

  const horarios: Horario[] = (servico.horarios ?? []).slice().sort(
    (a: Horario, b: Horario) =>
      DIAS_ORDEM.indexOf(a.dia) - DIAS_ORDEM.indexOf(b.dia)
  );

  return (
    <LayoutPublic>
      {/* Hero */}
      <section className="relative w-full h-[60vh] bg-tourism-marinho overflow-hidden">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={`Foto principal de ${servico.nome}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tourism-marinho/90 via-tourism-marinho/50 to-tourism-marinho/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-12 text-center">
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-tourism-menta mb-3">
            Apoio Turístico
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight drop-shadow-lg">
            {servico.nome}
          </h1>
        </div>
      </section>

      {/* Corpo principal */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        <div className="flex flex-col gap-10">
          <DescriptionSection
            subtitulo="Descubra"
            titulo={servico.nome}
            descricao={servico.descricao || ""}
            align="left"
          />

          {horarios.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold text-tourism-marinho mb-4 tracking-wide">
                <Clock size={20} className="text-tourism-verde shrink-0" aria-hidden="true" />
                Horários de Funcionamento
              </h2>
              <div className="rounded-xl border border-tourism-menta/50 overflow-hidden">
                {horarios.map((horario, index) => {
                  const hoje = DIA_SEMANA_HOJE[new Date().getDay()];
                  const isHoje = horario.dia === hoje;

                  return (
                    <div
                      key={index}
                      className={[
                        "flex items-center justify-between px-4 py-3 transition-colors",
                        // separador entre linhas (exceto a primeira)
                        index > 0 ? "border-t border-tourism-menta/40" : "",
                        // destaque para o dia atual
                        isHoje
                          ? "bg-tourism-menta/30 border-l-4 border-l-tourism-verde pl-3"
                          : "bg-white hover:bg-tourism-menta/10 border-l-4 border-l-transparent pl-3",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        {/* Abreviação em mobile, nome completo em sm+ */}
                        <span
                          className={[
                            "text-sm font-semibold",
                            isHoje ? "text-tourism-verde" : "text-tourism-marinho",
                          ].join(" ")}
                        >
                          <span className="sm:hidden">
                            {DIAS_ABREV[horario.dia] ?? horario.dia}
                          </span>
                          <span className="hidden sm:inline">
                            {DIAS_LABEL[horario.dia] ?? horario.dia}
                          </span>
                        </span>
                        {isHoje && (
                          <span className="inline-flex items-center rounded-full bg-tourism-verde px-2 py-0.5 text-[11px] font-semibold leading-none text-white">
                            Hoje
                          </span>
                        )}
                      </div>
                      <span
                        className={[
                          "text-sm tabular-nums",
                          isHoje
                            ? "font-semibold text-tourism-verde"
                            : "text-tourism-cinzaescuro",
                        ].join(" ")}
                      >
                        {horario.horario}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {fotos.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-tourism-marinho mb-4 tracking-wide">
                Galeria de Fotos
              </h2>
              <GaleriaDeImagens imagemUrls={fotos} />
            </section>
          )}
        </div>
      </div>

      <Informacoes
        contato={{
          telefone: servico.contato?.telefone || "",
          email: servico.contato?.email || "",
          site: servico.site || servico.contato?.instagram || "",
        }}
        mapa=""
      />
    </LayoutPublic>
  );
}
