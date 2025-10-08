"use client";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import Link from "next/link";
import { Filter } from "@/components/public/Filter";
import { AtracoesCard } from "@/components/public/AtracoesCard";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { useCategorias } from "@/hooks/http/useCategoria";
import { usePerfis } from "@/hooks/http/usePerfis";
import { useGetAllAtrativos } from "@/hooks/http/useAtrativos";
import { useGetAllServicos } from "@/hooks/http/useServicos";
import { AtracaoTuristicaFull } from "@/repositories/interfaces/IAtracaoTuristicaRepository";
import { ServicoTuristicoFull } from "@/repositories/interfaces/IServicoTuristicoRepository";

export default function PaginaAtrativos() {
  const {data: municipios} = useGetAllMunicipios();
  const {data: categorias } = useCategorias();
  const {data: perfils} = usePerfis();
  const {data: atracoes} = useGetAllAtrativos();
  const {data: servicos} = useGetAllServicos();

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="A EXPERIÊNCIA VOCÊ QUEM ESCOLHE!" cor="bg-tourism-azul" />
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mt-8">
          <div className="w-full md:w-1/4 md:flex-shrink-0">
            <Filter
              title="Municípios"
              items={municipios?.map((municipio) => ({
                label: municipio.nome,
                value: municipio.id.toString(),
              })) ?? []}
              onChange={(value) => console.log(value)}
              className="mb-6"
            />

            <Filter
              title="Tipo de Atrativo"
                items={categorias?.map((categoria) => ({
                  label: categoria.nome,
                  value: categoria.id.toString(),
                })) ?? []}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />

            <Filter
              title="Perfil"
                  items={perfils?.map((perfil) => ({
                    label: perfil.nome,
                    value: perfil.id.toString(),
                  })) ?? []}
              onChange={(value) => console.log(value)}
              className="mb-6"

            />
          </div>

          <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {atracoes?.map((atracao: AtracaoTuristicaFull) => (
              <Link key={atracao.id} href={`/atrativos/${atracao.id}`} passHref>
                <AtracoesCard
                  nome={atracao.nome}
                  cidade={atracao.municipio.nome}
                  imagemUrls={atracao.fotos.map(foto => foto.url) || []}
                  id={atracao.id}
                />
              </Link>
            ))}
            {servicos?.map((servico: ServicoTuristicoFull) => (
              <Link key={servico.id} href={`/servicos/${servico.id}`} passHref>
                <AtracoesCard
                  nome={servico.nome}
                  cidade={servico.municipio.nome}
                  imagemUrls={servico?.foto?.url ? [servico.foto.url] : []}
                  id={servico.id}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutPublic>
  );
}
