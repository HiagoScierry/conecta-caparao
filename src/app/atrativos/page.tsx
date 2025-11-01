"use client";
import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import Link from "next/link";
import { Filter } from "@/components/public/Filter";
import { AtracoesCard } from "@/components/public/AtracoesCard";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";
import { useCategorias } from "@/hooks/http/useCategoria";
import { useSubcategorias } from "@/hooks/http/useSubCategoria";
import { usePerfis } from "@/hooks/http/usePerfis";
import { useGetAllAtrativos } from "@/hooks/http/useAtrativos";
import { useGetAllServicos } from "@/hooks/http/useServicos";
import { AtracaoTuristicaLoadedData } from "@/hooks/http/useAtrativos";
import { ServicoTuristicoFull } from "@/repositories/interfaces/IServicoTuristicoRepository";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PaginaAtrativos() {
  const {data: municipios} = useGetAllMunicipios();
  const {data: categorias } = useCategorias();
  const {data: subcategorias } = useSubcategorias();
  const {data: perfils} = usePerfis();
  const {data: atracoes} = useGetAllAtrativos();
  const {data: servicos} = useGetAllServicos();

  // Estados para os filtros
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedSubcategorias, setSelectedSubcategorias] = useState<string[]>([]);
  const [selectedPerfis, setSelectedPerfis] = useState<string[]>([]);

  // Função para filtrar atrativos
  const filteredAtracoes = useMemo(() => {
    if (!atracoes) return [];
    
    return atracoes.filter((atracao: AtracaoTuristicaLoadedData) => {
      // Filtro por município
      const matchMunicipio = selectedMunicipios.length === 0 || 
        selectedMunicipios.includes(atracao.municipio.id.toString());

      // Filtro por categoria
      const matchCategoria = selectedCategorias.length === 0 || 
        atracao.categorias.some(cat => selectedCategorias.includes(cat.id.toString()));

      // Filtro por subcategoria
      const matchSubcategoria = selectedSubcategorias.length === 0 || 
        atracao.subcategorias.some(subcat => selectedSubcategorias.includes(subcat.id.toString()));

      // Filtro por perfil
      const matchPerfil = selectedPerfis.length === 0 || 
        atracao.perfis.some(perfil => selectedPerfis.includes(perfil.id.toString()));

      return matchMunicipio && matchCategoria && matchSubcategoria && matchPerfil;
    });
  }, [atracoes, selectedMunicipios, selectedCategorias, selectedSubcategorias, selectedPerfis]);

  // Função para filtrar serviços
  const filteredServicos = useMemo(() => {
    if (!servicos) return [];
    
    return servicos.filter((servico: ServicoTuristicoFull) => {
      // Filtro por município
      const matchMunicipio = selectedMunicipios.length === 0 || 
        selectedMunicipios.includes(servico.municipio.id.toString());

      return matchMunicipio;
    });
  }, [servicos, selectedMunicipios]);

  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="A EXPERIÊNCIA VOCÊ QUEM ESCOLHE!" cor="bg-tourism-azul" />
        
        <Tabs defaultValue="atrativos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="atrativos">Atrativos Turísticos</TabsTrigger>
            <TabsTrigger value="servicos">Serviços Turísticos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="atrativos">
            {/* Barra de controles */}
            <div className="w-full mb-6 mt-6 flex justify-between items-center">
              <div className="text-gray-600">
                {filteredAtracoes.length} atrativo(s) encontrado(s)
              </div>
              <button
                onClick={() => {
                  setSelectedMunicipios([]);
                  setSelectedCategorias([]);
                  setSelectedSubcategorias([]);
                  setSelectedPerfis([]);
                }}
                className="px-4 py-2 bg-tourism-verde text-white rounded-lg hover:bg-tourism-verde/80 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>

            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="w-full md:w-1/4 md:flex-shrink-0">
                <Filter
                  title="Municípios"
                  items={municipios?.map((municipio) => ({
                    label: municipio.nome,
                    value: municipio.id.toString(),
                  })) ?? []}
                  selectedValues={selectedMunicipios}
                  onChange={setSelectedMunicipios}
                  className="mb-6"
                />

                <Filter
                  title="Categorias"
                  items={categorias?.map((categoria) => ({
                    label: categoria.nome,
                    value: categoria.id.toString(),
                  })) ?? []}
                  selectedValues={selectedCategorias}
                  onChange={setSelectedCategorias}
                  className="mb-6"
                />

                <Filter
                  title="Subcategorias"
                  items={subcategorias?.map((subcategoria) => ({
                    label: subcategoria.nome,
                    value: subcategoria.id.toString(),
                  })) ?? []}
                  selectedValues={selectedSubcategorias}
                  onChange={setSelectedSubcategorias}
                  className="mb-6"
                />

                <Filter
                  title="Perfil"
                  items={perfils?.map((perfil) => ({
                    label: perfil.nome,
                    value: perfil.id.toString(),
                  })) ?? []}
                  selectedValues={selectedPerfis}
                  onChange={setSelectedPerfis}
                  className="mb-6"
                />
              </div>

              <div className="w-full md:flex-1">
                {filteredAtracoes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">
                      Nenhum atrativo encontrado
                    </div>
                    <p className="text-gray-400">
                      Tente ajustar os filtros para encontrar mais opções
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredAtracoes?.map((atracao: AtracaoTuristicaLoadedData) => (
                      <Link key={`atracao-${atracao.id}`} href={`/atrativos/${atracao.id}`} passHref>
                        <AtracoesCard
                          nome={atracao.nome}
                          cidade={atracao.municipio.nome}
                          imagemUrls={atracao.fotos.map(foto => foto.foto.url) || []}
                          id={atracao.id}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="servicos">
            {/* Barra de controles para serviços */}
            <div className="w-full mb-6 mt-6 flex justify-between items-center">
              <div className="text-gray-600">
                {filteredServicos.length} serviço(s) encontrado(s)
              </div>
              <button
                onClick={() => {
                  setSelectedMunicipios([]);
                }}
                className="px-4 py-2 bg-tourism-verde text-white rounded-lg hover:bg-tourism-verde/80 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>

            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="w-full md:w-1/4 md:flex-shrink-0">
                <Filter
                  title="Municípios"
                  items={municipios?.map((municipio) => ({
                    label: municipio.nome,
                    value: municipio.id.toString(),
                  })) ?? []}
                  selectedValues={selectedMunicipios}
                  onChange={setSelectedMunicipios}
                  className="mb-6"
                />
              </div>

              <div className="w-full md:flex-1">
                {filteredServicos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">
                      Nenhum serviço encontrado
                    </div>
                    <p className="text-gray-400">
                      Tente ajustar os filtros para encontrar mais opções
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredServicos?.map((servico: ServicoTuristicoFull) => (
                      <Link key={`servico-${servico.id}`} href={`/servicos/${servico.id}`} passHref>
                        <AtracoesCard
                          nome={servico.nome}
                          cidade={servico.municipio.nome}
                          imagemUrls={servico.fotos.map(foto => foto.foto.url) || []}
                          id={servico.id}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutPublic>
  );
}
