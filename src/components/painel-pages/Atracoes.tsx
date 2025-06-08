"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { AttractionModal } from "@/components/modals/AttractionModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";

export default function Atracoes() {
  const {toast} = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [attractionToDelete, setAttractionToDelete] = useState<any>(null);

  const [atracoes, setAtracoes] = useState([
    { id: 1, nome: "Cristo Redentor", municipio: "Rio de Janeiro", categoria: "Monumento", contato: "info@cristoredentor.com" },
    { id: 2, nome: "Praia de Copacabana", municipio: "Rio de Janeiro", categoria: "Praia", contato: "info@riotur.com" },
    { id: 3, nome: "MASP", municipio: "São Paulo", categoria: "Museu", contato: "contato@masp.org.br" },
    { id: 4, nome: "Pelourinho", municipio: "Salvador", categoria: "Centro Histórico", contato: "info@pelourinho.com" },
    { id: 5, nome: "Boa Viagem", municipio: "Recife", categoria: "Praia", contato: "turismo@recife.gov.br" },
  ]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', attraction?: any) => {
    setModalMode(mode);
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (attraction: any) => {
    setAttractionToDelete(attraction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAttraction = () => {
    if (attractionToDelete) {
      setAtracoes(atracoes.filter(atracao => atracao.id !== attractionToDelete.id));
      console.log('Atração excluída:', attractionToDelete);
      toast({
        title: "Atração excluída",
        description: `A atração ${attractionToDelete.nome} foi excluída com sucesso.`,
      })
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Atrações Turísticas</h2>
          <p className="text-muted-foreground">
            Gerencie as atrações turísticas cadastradas no sistema.
          </p>
        </div>
        <Button 
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create')}
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
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atracoes.map((atracao) => (
                <TableRow key={atracao.id}>
                  <TableCell className="font-medium">{atracao.id}</TableCell>
                  <TableCell>{atracao.nome}</TableCell>
                  <TableCell>{atracao.municipio}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-tourism-light text-tourism-primary">
                      {atracao.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>{atracao.contato}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('view', atracao)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('edit', atracao)}
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
