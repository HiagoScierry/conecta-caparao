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
import { AtracaoTuristicaLoadedData } from "@/hooks/http/useAtrativos";
import { ServicoTuristicoFull } from "@/repositories/interfaces/IServicoTuristicoRepository";
import { useState, useMemo } from "react";

function getNomeExibicao(nome: string): string {
  const lower = nome.toLowerCase();
  if (lower === "restaurantes") return "Gastronomia";
  if (lower === "lazer") return "Turismo";
  return nome;
}

type ItemUnificado =
  | { tipo: "atrativo"; data: AtracaoTuristicaLoadedData }
  | { tipo: "servico"; data: ServicoTuristicoFull };

export default function PaginaAtrativos() {
  const { data: municipios } = useGetAllMunicipios();
  const { data: categorias } = useCategorias();
  const { data: perfils } = usePerfis();
  const { data: atracoes } = useGetAllAtrativos();
  const { data: servicos } = useGetAllServicos();

  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedPerfis, setSelectedPerfis] = useState<string[]>([]);
  const [incluirServicos, setIncluirServicos] = useState(true);

  const categoryGroupMap = useMemo(() => {
    if (!categorias) return new Map<string, string[]>();

    const groupToIds = new Map<string, string[]>();
    const groupToRepId = new Map<string, string>();

    categorias.forEach((cat) => {
      const nomeExibicao = getNomeExibicao(cat.nome);
      if (!groupToIds.has(nomeExibicao)) {
        groupToIds.set(nomeExibicao, []);
        groupToRepId.set(nomeExibicao, cat.id.toString());
      }
      groupToIds.get(nomeExibicao)!.push(cat.id.toString());
    });

    const map = new Map<string, string[]>();
    groupToRepId.forEach((repId, label) => {
      map.set(repId, groupToIds.get(label)!);
    });
    return map;
  }, [categorias]);

  const categoriasFormatadas = useMemo(() => {
    if (!categorias) return [];

    const seen = new Set<string>();
    return categorias
      .map((cat) => ({
        ...cat,
        label: getNomeExibicao(cat.nome),
        value: cat.id.toString(),
      }))
      .filter((item) => {
        if (seen.has(item.label)) return false;
        seen.add(item.label);
        return true;
      });
  }, [categorias]);

  const filteredAtracoes = useMemo(() => {
    if (!atracoes) return [];
    return atracoes.filter((atracao: AtracaoTuristicaLoadedData) => {
      const matchMunicipio =
        selectedMunicipios.length === 0 ||
        selectedMunicipios.includes(atracao.municipio.id.toString());

      const matchCategoria =
        selectedCategorias.length === 0 ||
        atracao.categorias.some((cat) => {
          const catIdStr = cat.id.toString();
          return selectedCategorias.some((selectedRepId) => {
            const allIds = categoryGroupMap.get(selectedRepId) ?? [selectedRepId];
            return allIds.includes(catIdStr);
          });
        });

      const matchPerfil =
        selectedPerfis.length === 0 ||
        atracao.perfis.some((perfil) =>
          selectedPerfis.includes(perfil.id.toString()),
        );

      return matchMunicipio && matchCategoria && matchPerfil;
    });
  }, [atracoes, selectedMunicipios, selectedCategorias, selectedPerfis, categoryGroupMap]);

  const filteredServicos = useMemo(() => {
    if (!servicos || !incluirServicos) return [];
    return (servicos as ServicoTuristicoFull[]).filter((servico) => {
      return (
        selectedMunicipios.length === 0 ||
        selectedMunicipios.includes(servico.municipio.id.toString())
      );
    });
  }, [servicos, selectedMunicipios, incluirServicos]);

  const itensUnificados = useMemo((): ItemUnificado[] => {
    const atrativos: ItemUnificado[] = filteredAtracoes.map((a) => ({
      tipo: "atrativo",
      data: a,
    }));
    const servs: ItemUnificado[] = filteredServicos.map((s) => ({
      tipo: "servico",
      data: s,
    }));
    return [...atrativos, ...servs];
  }, [filteredAtracoes, filteredServicos]);

  const hasActiveFilters =
    selectedMunicipios.length > 0 ||
    selectedCategorias.length > 0 ||
    selectedPerfis.length > 0;

  function clearFilters() {
    setSelectedMunicipios([]);
    setSelectedCategorias([]);
    setSelectedPerfis([]);
  }

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner
          titulo="A EXPERIÊNCIA VOCÊ QUEM ESCOLHE!"
          cor="bg-tourism-marinho"
        />

        <div className="flex flex-col items-start md:flex-row gap-6 mt-8">
          {/* Sidebar de filtros */}
          <div className="w-full md:w-1/4 md:flex-shrink-0">
            <Filter
              title="Municípios"
              items={
                municipios?.map((municipio) => ({
                  label: municipio.nome,
                  value: municipio.id.toString(),
                })) ?? []
              }
              selectedValues={selectedMunicipios}
              onChange={setSelectedMunicipios}
              className="mb-4"
            />

            <Filter
              title="Atrativos"
              items={categoriasFormatadas}
              selectedValues={selectedCategorias}
              onChange={setSelectedCategorias}
              className="mb-4"
            />

            <Filter
              title="Perfil"
              items={
                perfils?.map((perfil) => ({
                  label: perfil.nome,
                  value: perfil.id.toString(),
                })) ?? []
              }
              selectedValues={selectedPerfis}
              onChange={setSelectedPerfis}
              className="mb-4"
            />

            {/* Toggle Apoio Turístico */}
            <label className="flex items-center justify-between bg-tourism-marinho text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-tourism-marinho/90 transition-colors">
              <span className="font-bold text-sm">Apoio Turístico</span>
              <input
                type="checkbox"
                checked={incluirServicos}
                onChange={(e) => setIncluirServicos(e.target.checked)}
                className="w-4 h-4 accent-white cursor-pointer"
              />
            </label>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 w-full px-4 py-2 border border-tourism-marinho text-tourism-marinho rounded-lg hover:bg-tourism-marinho hover:text-white transition-colors text-sm font-medium"
              >
                Limpar Filtros
              </button>
            )}
          </div>

          {/* Grid unificado */}
          <div className="w-full md:flex-1">
            <div className="mb-4 text-gray-500 text-sm">
              {itensUnificados.length} resultado{itensUnificados.length !== 1 ? "s" : ""} encontrado{itensUnificados.length !== 1 ? "s" : ""}
            </div>

            {itensUnificados.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itensUnificados.map((item) => {
                  if (item.tipo === "atrativo") {
                    const atracao = item.data as AtracaoTuristicaLoadedData;
                    return (
                      <Link
                        key={`atracao-${atracao.id}`}
                        href={`/atrativos/${atracao.id}`}
                        passHref
                      >
                        <AtracoesCard
                          nome={atracao.nome}
                          cidade={atracao.municipio.nome}
                          imagemUrls={atracao.fotos.map((foto) => foto.foto.url)}
                          id={atracao.id}
                          tipo="atrativo"
                        />
                      </Link>
                    );
                  }

                  const servico = item.data as ServicoTuristicoFull;
                  return (
                    <Link
                      key={`servico-${servico.id}`}
                      href={`/servicos/${servico.id}`}
                      passHref
                    >
                      <AtracoesCard
                        nome={servico.nome}
                        cidade={servico.municipio.nome}
                        imagemUrls={servico.fotos.map((foto) => foto.foto.url)}
                        id={servico.id}
                        tipo="servico"
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutPublic>
  );
}
