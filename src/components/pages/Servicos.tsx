"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

export default function Servicos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);

  const [servicos, setServicos] = useState([
    { id: 1, nome: "Hotel Atlântico", descricao: "Hotel 5 estrelas na orla", endereco: "Av. Atlântica, 1000", contato: "contato@atlantico.com" },
    { id: 2, nome: "Restaurante Mar Azul", descricao: "Especializado em frutos do mar", endereco: "Rua das Conchas, 123", contato: "reservas@marazul.com" },
    { id: 3, nome: "Agência Aventura", descricao: "Passeios ecológicos", endereco: "Av. das Árvores, 456", contato: "contato@aventura.com" },
    { id: 4, nome: "Pousada Recanto", descricao: "Hospedagem familiar", endereco: "Estrada do Sol, 789", contato: "reservas@recanto.com" },
    { id: 5, nome: "Transportes Turísticos", descricao: "Traslados e city tours", endereco: "Av. Central, 321", contato: "reservas@transportestur.com" },
  ]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', service?: any) => {
    setModalMode(mode);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (service: any) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = () => {
    if (serviceToDelete) {
      setServicos(servicos.filter(servico => servico.id !== serviceToDelete.id));
      console.log('Serviço excluído:', serviceToDelete);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Serviços Turísticos</h2>
          <p className="text-muted-foreground">
            Gerencie os serviços turísticos disponíveis.
          </p>
        </div>
        <Button 
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Serviço
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicos.map((servico) => (
                <TableRow key={servico.id}>
                  <TableCell className="font-medium">{servico.id}</TableCell>
                  <TableCell>{servico.nome}</TableCell>
                  <TableCell>{servico.descricao}</TableCell>
                  <TableCell>{servico.endereco}</TableCell>
                  <TableCell>{servico.contato}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('view', servico)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('edit', servico)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(servico)}
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

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedService}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteService}
        title="Excluir Serviço"
        description="Tem certeza que deseja excluir o serviço"
        itemName={serviceToDelete?.nome}
      />
    </div>
  );
}
