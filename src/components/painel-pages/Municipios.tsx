"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { MunicipalityModal } from "@/components/modals/MunicipalityModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import { useCreateMunicipio, useDeleteMunicipio, useGetAllMunicipios, useUpdateMunicipio } from "@/hooks/http/useMunicipio";
import { MunicipioForm } from "@/forms/municipioForm";
import { useUpload } from "@/hooks/http/useUpload";
import { Contato, Foto, GaleriaFoto, Municipio } from "@prisma/client";

export default function Municipios() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipio & { contato: Contato; fotos: Foto[] } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [municipalityToDelete, setMunicipalityToDelete] = useState<Municipio | null>(null);

  const { data: municipios } = useGetAllMunicipios() as {
    data: (Municipio & { contato: Contato; fotos: Foto[] })[] | undefined;
  };

  const { mutateAsync: uploadImage } = useUpload();
  const { mutateAsync: createMunicipio } = useCreateMunicipio();
  const { mutateAsync: updateMunicipio } = useUpdateMunicipio();
  const { mutateAsync: deleteMunicipio } = useDeleteMunicipio();

  const handleOpenModal = (
    mode: 'create' | 'edit' | 'view',
    municipality?: Municipio & { contato: Contato; fotos: (GaleriaFoto & { foto: Foto })[] }
  ) => {
    setModalMode(mode);

    if (municipality) {
      // Ensure fotos is an array of Foto, not GaleriaFoto
      const fotos: Foto[] =
        Array.isArray(municipality.fotos)
          ? municipality.fotos.map((gf) =>
              // If gf has a 'foto' property, use it, otherwise assume it's already Foto
              'foto' in gf ? gf.foto : (gf as Foto)
            )
          : [];

      // Ensure all required properties are present and not undefined
      const selected: Municipio & { contato: Contato; fotos: Foto[] } = {
        id: municipality.id,
        nome: municipality.nome,
        descricao: municipality.descricao ?? null,
        site: municipality.site ?? null,
        mapaUrl: municipality.mapaUrl,
        idContato: municipality.idContato,
        createdAt: municipality.createdAt,
        updatedAt: municipality.updatedAt,
        contato: municipality.contato,
        fotos,
      };

      setSelectedMunicipality(selected);
    } else {
      setSelectedMunicipality(null);
    }
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (municipality: Municipio & { contato: Contato; fotos: (GaleriaFoto & {foto: Foto})[] }) => {
    setMunicipalityToDelete(municipality);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMunicipality = async () => {
    if (municipalityToDelete) {
      await deleteMunicipio(String(municipalityToDelete.id));

      toast({
        title: "Município excluído",
        description: `O município "${municipalityToDelete.nome}" foi excluído com sucesso.`,
      });
    }
  };

  const handleSaveMunicipality = async (municipalityData: MunicipioForm, fotoUrl: File[]) => {
    const uploadedUrls = await Promise.all(
      fotoUrl.map(async (file) => {
        const url = await uploadImage(file);
        return url;
      })
    );

    if (modalMode === 'create') {
      createMunicipio({
        municipio: municipalityData.municipio,
        contato: municipalityData.contato,
        fotosUrl: uploadedUrls,
      });
      toast({
        title: "Município criado",
        description: `O município "${municipalityData.municipio.nome}" foi criado com sucesso.`,
      });
    } else if (modalMode === 'edit') {
      await updateMunicipio({
        id: String(selectedMunicipality?.id),
        municipio: municipalityData.municipio,
        contato: municipalityData.contato,
        fotosUrl: uploadedUrls,
      });
      toast({
        title: "Município atualizado",
        description: `O município "${municipalityData.municipio.nome}" foi atualizado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Municípios</h2>
          <p className="text-muted-foreground">
            Gerencie os municípios registrados no sistema.
          </p>
        </div>
        <Button 
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create', undefined)}
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
              {municipios?.map((municipio: Municipio & { contato: Contato; fotos: Foto[] }) => (
                <TableRow key={municipio.id}>
                  <TableCell className="font-medium">{municipio.id}</TableCell>
                  <TableCell>{municipio.nome}</TableCell>
                  <TableCell>{municipio.site}</TableCell>
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
        </CardContent>
      </Card>

      <MunicipalityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedMunicipality || undefined}
        onSave={handleSaveMunicipality}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteMunicipality}
        title="Excluir Município"
        description="Tem certeza que deseja excluir o município"
        itemName={municipalityToDelete?.nome}
      />
    </div>
  );
}
