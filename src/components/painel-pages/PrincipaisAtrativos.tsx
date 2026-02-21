"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGetAllPrincipaisAtrativos,
  useCreatePrincipalAtrativo,
  useDeletePrincipalAtrativo,
  useGetAtratosDiponiveis,
} from "@/hooks/http/usePrincipaisAtrativos";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useGetAllMunicipios } from "@/hooks/http/useMunicipio";

interface PrincipalAtratoItem {
  id: number;
  posicao: number;
  idAtracaoTuristica: number;
  atracaoTuristica: {
    id: number;
    nome: string;
    municipio?: { id: number; nome: string };
  };
}

interface Filters {
  municipioId?: number;
  categoriaId?: number;
  subcategoriaId?: number;
  perfilClienteId?: number;
}

export default function PrincipaisAtrativos() {
  const { toast } = useToast();
  const [selectedAtracaoId, setSelectedAtracaoId] = useState<string>("");
  const [selectedPosicao, setSelectedPosicao] = useState<string>("");
  const [atrativoToDelete, setAtrativoToDelete] = useState<PrincipalAtratoItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  // Fetch data
  const { data: principaisResponse, isLoading: isLoadingPrincipais } =
    useGetAllPrincipaisAtrativos();
  const { data: atratosDiponiveis, isLoading: isLoadingDisponiveis } =
    useGetAtratosDiponiveis(filters);
  const { data: municipios, isLoading: isLoadingMunicipios } =
    useGetAllMunicipios();
  const { mutateAsync: createPrincipal, isPending: isCreating } =
    useCreatePrincipalAtrativo();
  const { mutateAsync: deletePrincipal, isPending: isDeleting } =
    useDeletePrincipalAtrativo();

  const principais = principaisResponse?.principais || [];
  const maxPrincipais = principaisResponse?.max || 5;
  const totalPrincipais = principaisResponse?.total || 0;

  // Filter out atrativos that are already principals
  const atratosDisponiveisFiltered = (atratosDiponiveis || []).filter(
    (atrativo) =>
      !principais.some((p) => p.idAtracaoTuristica === atrativo.id)
  );

  const municipioNome = filters.municipioId
    ? municipios?.find((m) => m.id === filters.municipioId)?.nome || ""
    : "";

  const handleAddPrincipal = async () => {
    if (!selectedAtracaoId || !selectedPosicao) {
      toast({
        description: "Por favor selecione um atrativo e uma posição",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPrincipal({
        posicao: Number(selectedPosicao),
        idAtracaoTuristica: Number(selectedAtracaoId),
      });

      toast({
        description: "Principal atrativo adicionado com sucesso!",
      });

      setSelectedAtracaoId("");
      setSelectedPosicao("");
    } catch (error) {
      toast({
        description:
          error instanceof Error
            ? error.message
            : "Erro ao adicionar principal atrativo",
        variant: "destructive",
      });
    }
  };

  const handleDeletePrincipal = async (item: PrincipalAtratoItem) => {
    setAtrativoToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!atrativoToDelete) return;

    try {
      await deletePrincipal(atrativoToDelete.id);

      toast({
        description: "Principal atrativo removido com sucesso!",
      });

      setIsDeleteModalOpen(false);
      setAtrativoToDelete(null);
    } catch (error) {
      toast({
        description:
          error instanceof Error
            ? error.message
            : "Erro ao remover principal atrativo",
        variant: "destructive",
      });
    }
  };

  const posicoesDiponiveis = Array.from({ length: maxPrincipais }, (_, i) => i + 1)
    .filter(
      (pos) =>
        !principais.some((p) => p.posicao === pos) ||
        principais.find((p) => p.posicao === pos)?.idAtracaoTuristica === atrativoToDelete?.id
    );

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Principais Atrativos</h1>
          <p className="text-gray-600">
            Gerenciar os {maxPrincipais} principais atrativos do site
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {totalPrincipais}/{maxPrincipais}
        </Badge>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Município</label>
                <Select
                  value={String(filters.municipioId || "")}
                  onValueChange={(value) => {
                    if (value === "") {
                      setFilters({ ...filters, municipioId: undefined });
                    } else {
                      setFilters({ ...filters, municipioId: Number(value) });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os municípios" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingMunicipios ? (
                      <SelectItem value="loading" disabled>
                        Carregando...
                      </SelectItem>
                    ) : municipios && municipios.length > 0 ? (
                      municipios.map((municipio) => (
                        <SelectItem key={municipio.id} value={String(municipio.id)}>
                          {municipio.nome}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="empty" disabled>
                        Nenhum município disponível
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select
                  value={String(filters.categoriaId || "")}
                  onValueChange={(value) => {
                    if (value === "") {
                      setFilters({ ...filters, categoriaId: undefined });
                    } else {
                      setFilters({ ...filters, categoriaId: Number(value) });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Subcategoria</label>
                <Select
                  value={String(filters.subcategoriaId || "")}
                  onValueChange={(value) => {
                    if (value === "") {
                      setFilters({ ...filters, subcategoriaId: undefined });
                    } else {
                      setFilters({ ...filters, subcategoriaId: Number(value) });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as subcategorias" />
                  </SelectTrigger>
                  <SelectContent>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Perfil Cliente</label>
                <Select
                  value={String(filters.perfilClienteId || "")}
                  onValueChange={(value) => {
                    if (value === "") {
                      setFilters({ ...filters, perfilClienteId: undefined });
                    } else {
                      setFilters({ ...filters, perfilClienteId: Number(value) });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os perfis" />
                  </SelectTrigger>
                  <SelectContent>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Badges para filtros ativos */}
            {Object.keys(filters).some(
              (key) => filters[key as keyof Filters] !== undefined
            ) && (
              <div className="flex gap-2 flex-wrap pt-2">
                {filters.municipioId && (
                  <Badge variant="secondary" className="gap-2">
                    Município: {municipioNome}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() =>
                        setFilters({ ...filters, municipioId: undefined })
                      }
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Principal Atrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Atrativo</label>
                <Select value={selectedAtracaoId} onValueChange={setSelectedAtracaoId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um atrativo" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDisponiveis ? (
                      <SelectItem value="loading" disabled>
                        Carregando...
                      </SelectItem>
                    ) : atratosDisponiveisFiltered && atratosDisponiveisFiltered.length > 0 ? (
                      atratosDisponiveisFiltered.map((atrativo) => (
                        <SelectItem key={atrativo.id} value={String(atrativo.id)}>
                          {atrativo.nome}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="empty" disabled>
                        Nenhum atrativo disponível
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Posição</label>
                <Select value={selectedPosicao} onValueChange={setSelectedPosicao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma posição" />
                  </SelectTrigger>
                  <SelectContent>
                    {posicoesDiponiveis.map((posicao) => (
                      <SelectItem key={posicao} value={String(posicao)}>
                        Posição {posicao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleAddPrincipal}
                  disabled={isCreating || !selectedAtracaoId || !selectedPosicao}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Principais Atrativos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingPrincipais ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Carregando...</p>
            </div>
          ) : principais.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum principal atrativo cadastrado ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posição</TableHead>
                    <TableHead>Nome do Atrativo</TableHead>
                    <TableHead>Município</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {principais
                    .sort((a, b) => a.posicao - b.posicao)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="secondary">#{item.posicao}</Badge>
                        </TableCell>
                        <TableCell>{item.atracaoTuristica.nome}</TableCell>
                        <TableCell>
                          {item.atracaoTuristica.municipio?.nome || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePrincipal(item)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAtrativoToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Remover Principal Atrativo"
        description={`Deseja remover "${atrativoToDelete?.atracaoTuristica.nome}" dos principais atrativos?`}
      />
    </div>
  );
}
