"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { MunicipalityModal } from "@/components/modals/MunicipalityModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";

export default function Municipios() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [municipalityToDelete, setMunicipalityToDelete] = useState<any>(null);

  const [municipios, setMunicipios] = useState([
    { id: 1, nome: "Rio de Janeiro", descricao: "Cidade Maravilhosa", site: "https://rio.gov.br", contato: "contato@rio.gov.br" },
    { id: 2, nome: "São Paulo", descricao: "Capital econômica", site: "https://sp.gov.br", contato: "contato@sp.gov.br" },
    { id: 3, nome: "Salvador", descricao: "Terra da alegria", site: "https://salvador.gov.br", contato: "contato@salvador.gov.br" },
    { id: 4, nome: "Recife", descricao: "Veneza brasileira", site: "https://recife.gov.br", contato: "contato@recife.gov.br" },
    { id: 5, nome: "Fortaleza", descricao: "Terra da luz", site: "https://fortaleza.gov.br", contato: "contato@fortaleza.gov.br" },
  ]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', municipality?: any) => {
    setModalMode(mode);
    setSelectedMunicipality(municipality);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (municipality: any) => {
    setMunicipalityToDelete(municipality);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMunicipality = () => {
    if (municipalityToDelete) {
      setMunicipios(municipios.filter(municipio => municipio.id !== municipalityToDelete.id));
      toast({
        title: "Município excluído",
        description: `O município "${municipalityToDelete.nome}" foi excluído com sucesso.`,
      });
      console.log('Município excluído:', municipalityToDelete);
    }
  };

  const handleSaveMunicipality = (municipalityData: any) => {
    if (modalMode === 'create') {
      const newMunicipality = { ...municipalityData, id: Date.now() };
      setMunicipios([...municipios, newMunicipality]);
      toast({
        title: "Município criado",
        description: `O município "${municipalityData.nome}" foi criado com sucesso.`,
      });
    } else if (modalMode === 'edit') {
      setMunicipios(municipios.map(municipio => 
        municipio.id === selectedMunicipality.id ? { ...municipio, ...municipalityData } : municipio
      ));
      toast({
        title: "Município atualizado",
        description: `O município "${municipalityData.nome}" foi atualizado com sucesso.`,
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
                <TableHead>Descrição</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {municipios.map((municipio) => (
                <TableRow key={municipio.id}>
                  <TableCell className="font-medium">{municipio.id}</TableCell>
                  <TableCell>{municipio.nome}</TableCell>
                  <TableCell>{municipio.descricao}</TableCell>
                  <TableCell>{municipio.site}</TableCell>
                  <TableCell>{municipio.contato}</TableCell>
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
        initialData={selectedMunicipality}
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
