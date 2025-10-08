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
import { PlusCircle, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { EventModal } from "@/components/modals/EventModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateEvento,
  useDeleteEvento,
  useEvento,
  useUpdateEvento,
} from "@/hooks/http/useEvento";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";
import { useUpload } from "@/hooks/http/useUpload";
import { EventoForm } from "@/forms/eventoForm";

export default function Eventos() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedEvent, setSelectedEvent] = useState<EventoFull | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventoFull | null>(null);

  const { data: eventos } = useEvento();

  const { mutateAsync: createEvento } = useCreateEvento();
  const { mutateAsync: updateEvento } = useUpdateEvento();
  const { mutateAsync: deleteEvento } = useDeleteEvento();
  const { mutateAsync: uploadImagem } = useUpload();

  const handleOpenModal = (
    mode: "create" | "edit" | "view",
    event?: EventoFull
  ) => {
    setModalMode(mode);
    setSelectedEvent(event || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (event: EventoFull) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      await deleteEvento(eventToDelete.id);
      toast({
        title: "Evento excluído",
        description: `O evento "${eventToDelete.nome}" foi excluído com sucesso.`,
      });
      console.log("Evento excluído:", eventToDelete);
    }
  };

  const handleSaveEvent = async (eventData: EventoForm & { fotos: File[] }) => {
    try {
      const uploadFilesUrl = await Promise.all(
        eventData.fotos.map(async (file) => {
          const url = await uploadImagem(file);
          return url;
        })
      );

      if (modalMode === "create") {
        await createEvento({
          ...eventData,
          fotosUrl: uploadFilesUrl,
        });
        toast({
          title: "Evento criado",
          description: `O evento "${eventData.evento.nome}" foi criado com sucesso.`,
        });
      } else if (modalMode === "edit") {
        await updateEvento({
          ...eventData,
          fotosUrl: uploadFilesUrl.length > 0 ? uploadFilesUrl : undefined,
        });
        toast({
          title: "Evento atualizado",
          description: `O evento "${eventData.evento.nome}" foi atualizado com sucesso.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast({
        title: "Erro ao salvar evento",
        description: "Ocorreu um erro ao salvar o evento. Tente novamente.",
        variant: "destructive",
      });
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
          onClick={() => handleOpenModal("create")}
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
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos?.map((evento: EventoFull) => (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">{evento.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-tourism-primary" />
                    {evento.nome}
                  </TableCell>
                  <TableCell>
                    {evento.data instanceof Date
                      ? evento.data.toLocaleDateString()
                      : evento.data}
                  </TableCell>
                  <TableCell>{evento.municipio.nome}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("view", evento)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("edit", evento)}
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
        onSave={handleSaveEvent}
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
