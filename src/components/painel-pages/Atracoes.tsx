"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { AtracaoTuristicaFull, AttractionModal } from "@/components/modals/AttractionModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  AtracaoTuristicaLoadedData,
  useCreateAtrativo,
  useDeleteAtrativo,
  useGetAllAtrativos,
  useUpdateAtrativo,
} from "@/hooks/http/useAtrativos";
import { AtracaoForm } from "@/forms/atracaoForm";
import { useUpload } from "@/hooks/http/useUpload"

export default function Atracoes() {
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedAttraction, setSelectedAttraction] =
    useState<AtracaoTuristicaFull | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [attractionToDelete, setAttractionToDelete] =
    useState<AtracaoTuristicaLoadedData | null>(null);

  const { data: atracoes = [] } = useGetAllAtrativos();

  const { mutateAsync: uploadImage } = useUpload();

  const { mutateAsync: createAtrativo } = useCreateAtrativo();
  const { mutateAsync: updateAtrativo } = useUpdateAtrativo();
  const { mutateAsync: deleteAtrativo } = useDeleteAtrativo();

  const handleOpenModal = (
    mode: "create" | "edit" | "view",
    attraction?: AtracaoTuristicaLoadedData | null
  ) => {
    setModalMode(mode);

    console.log("LOADED ATRACAO",attraction);

    const atracaoFull: AtracaoTuristicaFull | null = attraction
      ? {
          id: attraction.id,
          nome: attraction.nome,
          descricao: attraction.descricao ?? null,
          mapaUrl: attraction.mapaUrl ?? null,
          site: attraction.site ?? null,
          idContato: attraction.contato?.id ?? 0,
          idEndereco: attraction.endereco?.id ?? 0,
          idMunicipio: attraction.municipio?.id ?? 0,
          createdAt: attraction.createdAt,
          updatedAt: attraction.updatedAt,
          endereco: attraction.endereco,
          contato: attraction.contato,
          municipio: attraction.municipio, // <-- Added this line
          horarioFuncionamento: attraction.horarios,
          fotos: attraction.fotos.map(f => f.foto),
          categoria: attraction.categorias[0],
          subcategorias: attraction.subcategorias,
          perfis: attraction.perfis
        }
      : null;

    setSelectedAttraction(atracaoFull);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (attraction: AtracaoTuristicaLoadedData | null) => {
    setAttractionToDelete(attraction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAttraction = async () => {
    if (attractionToDelete) {
      await deleteAtrativo(attractionToDelete.id);
      console.log("Atração excluída:", attractionToDelete);
      toast({
        title: "Atração excluída",
        description: `A atração ${attractionToDelete.nome} foi excluída com sucesso.`,
      });
    }
  };

  const handleSave = async (attractionData: AtracaoForm & { fotos: File[] }) => {
    try {
      const uploadedUrls = await Promise.all(
        (attractionData.fotos || []).map(async (file) => {
          const url = await uploadImage(file);
          return url;
        })
      );

      if (modalMode === "create") {
        await createAtrativo({
          ...attractionData,
          fotosURL: uploadedUrls,
        });
        toast({
          title: "Atração criada",
          description: `A atração foi criada com sucesso.`,
        });
      } else if (modalMode === "edit") {
        try {
          await updateAtrativo({
            ...attractionData,
            fotosURL: uploadedUrls,
          });
          toast({
            title: "Atração atualizada",
            description: `A atração foi atualizada com sucesso.`,
          });
        } catch (updateError) {
          console.error("Error updating attraction:", updateError);
          toast({
            title: "Erro ao atualizar atração",
            description: "Ocorreu um erro inesperado ao atualizar a atração.",
            variant: "destructive",
          });

        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving attraction:", error);
      toast({
        title: "Erro ao salvar atração",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Atrações Turísticas
          </h2>
          <p className="text-muted-foreground">
            Gerencie as atrações turísticas cadastradas no sistema.
          </p>
        </div>
        <Button
          className="bg-tourism-primary"
          onClick={() => handleOpenModal("create")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Atração
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Atrações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Município</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atracoes?.map((atracao: AtracaoTuristicaLoadedData) => (
                <TableRow key={atracao.id}>
                  <TableCell className="font-medium">{atracao.id}</TableCell>
                  <TableCell>{atracao.nome}</TableCell>
                  <TableCell>{atracao.municipio.nome}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-tourism-light text-tourism-primary"
                    >
                      {atracao.categorias?.map(categoria => categoria.nome).join(", ") ?? "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("view", atracao)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("edit", atracao)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(atracao)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AttractionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedAttraction}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAttraction}
        title="Excluir Atração"
        description="Tem certeza que deseja excluir a atração"
        itemName={attractionToDelete?.nome}
      />
    </div>
  );
}
