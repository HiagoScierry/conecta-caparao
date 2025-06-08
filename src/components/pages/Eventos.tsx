"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { EventModal } from "@/components/modals/EventModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

export default function Eventos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  const [eventos, setEventos] = useState([
    { id: 1, nome: "Festival de Verão", data: "2023-01-15", municipio: "Rio de Janeiro", endereco: "Praia de Copacabana" },
    { id: 2, nome: "Exposição de Arte", data: "2023-02-20", municipio: "São Paulo", endereco: "MASP, Avenida Paulista" },
    { id: 3, nome: "Carnaval 2023", data: "2023-02-25", municipio: "Salvador", endereco: "Circuito Barra-Ondina" },
    { id: 4, nome: "Feira Gastronômica", data: "2023-03-10", municipio: "Recife", endereco: "Marco Zero" },
    { id: 5, nome: "Festival de Jazz", data: "2023-04-05", municipio: "Fortaleza", endereco: "Centro Cultural Dragão do Mar" },
  ]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', event?: any) => {
    setModalMode(mode);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (event: any) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEventos(eventos.filter(evento => evento.id !== eventToDelete.id));
      console.log('Evento excluído:', eventToDelete);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
          <p className="text-muted-foreground">
            Gerencie os eventos turísticos do sistema.
          </p>
        </div>
        <Button 
          className="bg-tourism-primary"
          onClick={() => handleOpenModal('create')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Município</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">{evento.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-tourism-primary" />
                    {evento.nome}
                  </TableCell>
                  <TableCell>{evento.data}</TableCell>
                  <TableCell>{evento.municipio}</TableCell>
                  <TableCell>{evento.endereco}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('view', evento)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenModal('edit', evento)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(evento)}
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

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedEvent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
        title="Excluir Evento"
        description="Tem certeza que deseja excluir o evento"
        itemName={eventToDelete?.nome}
      />
    </div>
  );
}
