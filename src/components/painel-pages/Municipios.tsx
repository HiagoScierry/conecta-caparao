"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { MunicipalityModal } from "@/components/modals/MunicipalityModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  useGetAllMunicipios,
  useCreateMunicipio,
  useUpdateMunicipio,
  useDeleteMunicipio,
  useGetMunicipioById
} from "@/hooks/http/useMunicipio";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { MunicipioForm } from "@/forms/municipioForm";

export default function Municipios() {
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipioDTO | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [municipalityToDelete, setMunicipalityToDelete] = useState<MunicipioDTO | null>(null);

  const { data: municipios = [], isLoading } = useGetAllMunicipios();


  const { data: municipioById } = useGetMunicipioById(selectedMunicipality?.id || '');
  const { mutate: createMunicipio } = useCreateMunicipio();
  const { mutate: updateMunicipio } = useUpdateMunicipio();
  const { mutate: deleteMunicipio } = useDeleteMunicipio();

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', municipality?: MunicipioDTO) => {
    setModalMode(mode);
    setSelectedMunicipality(municipality ?? null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (municipality: MunicipioDTO) => {
    setMunicipalityToDelete(municipality);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMunicipality = () => {
    if (municipalityToDelete?.id) {
      deleteMunicipio(municipalityToDelete.id);
      toast({
        title: "Município excluído",
        description: `O município "${municipalityToDelete.nome}" foi excluído com sucesso.`,
      });
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveMunicipality = (municipioData: MunicipioForm, files: string[]) => {
    municipioData.fotos = files;

    if (modalMode === 'create') {
      createMunicipio(municipioData);
      toast({
        title: "Município criado",
        description: `O município "${municipioData.municipio.nome}" foi criado com sucesso.`,
      });
    } else if (modalMode === 'edit') {
      updateMunicipio(municipioData);
      toast({
        title: "Município atualizado",
        description: `O município "${municipioData.municipio.nome}" foi atualizado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Municípios</h2>
          <p className="text-muted-foreground">Gerencie os municípios registrados no sistema.</p>
        </div>
        <Button
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Município
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Municípios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Site</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {municipios.map((municipio) => (
                <TableRow key={municipio.id}>
                  <TableCell className="font-medium">{municipio.id}</TableCell>
                  <TableCell>{municipio.nome}</TableCell>
                  <TableCell>{municipio.descricao}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal('view', municipio)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal('edit', municipio)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(municipio)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading && <p className="text-sm text-muted-foreground mt-4">Carregando municípios...</p>}
        </CardContent>
      </Card>

      <MunicipalityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={{
          municipio: municipioById?.municipio || {},
          contato: municipioById?.contato || {}
        }}
        onSave={handleSaveMunicipality}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteMunicipality}
        title="Excluir Município"
        description="Tem certeza que deseja excluir o município?"
        itemName={municipalityToDelete?.nome}
      />
    </div>
  );
}
