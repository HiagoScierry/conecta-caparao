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
import { AttractionModal } from "@/components/modals/AttractionModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAtrativo,
  useDeleteAtrativo,
  useGetAllAtrativos,
  useUpdateAtrativo,
} from "@/hooks/http/useAtrativos";
import { AtracaoForm } from "@/forms/atracaoForm";
import { useUpload } from "@/hooks/http/useUpload";
import { AtracaoTuristica } from "@prisma/client";

export default function Atracoes() {
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedAttraction, setSelectedAttraction] =
    useState<AtracaoTuristica | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [attractionToDelete, setAttractionToDelete] =
    useState<AtracaoTuristica | null>(null);

  const { data: atracoes = [] } = useGetAllAtrativos();

  const { mutateAsync: uploadImage } = useUpload();

  const { mutateAsync: createAtrativo } = useCreateAtrativo();
  const { mutateAsync: updateAtrativo } = useUpdateAtrativo();
  const { mutateAsync: deleteAtrativo } = useDeleteAtrativo();

  const handleOpenModal = (
    mode: "create" | "edit" | "view",
    attraction?: AtracaoTuristica | null
  ) => {
    setModalMode(mode);
    setSelectedAttraction(attraction || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (attraction: AtracaoTuristica | null) => {
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
        createAtrativo({
          ...attractionData,
          fotosURL: uploadedUrls,
        });
        toast({
          title: "Atração criada",
          description: `A atração "${attractionData.atracaoTuristica.nome}" foi criada com sucesso.`,
        });
      } else if (modalMode === "edit") {
        console.log(attractionData);
        console.log(uploadedUrls);

        await updateAtrativo({
          ...attractionData,
          fotosURL: uploadedUrls,
        });
        toast({
          title: "Atração atualizada",
          description: `A atração "${attractionData.atracaoTuristica.nome}" foi atualizada com sucesso.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving attraction:", error);
      toast({
        title: "Erro ao salvar atração",
        description: "Ocorreu um erro ao salvar a atração. Tente novamente.",
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
              {atracoes?.map((atracao: AtracaoTuristica) => (
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
