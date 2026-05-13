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
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateServico,
  useGetAllServicos,
  useUpdateServico,
  useDeleteServico,
  useToggleAtivoServico,
} from "@/hooks/http/useServicos";
import { ServicoTuristicoFull } from "@/repositories/interfaces/IServicoTuristicoRepository";
import { ServicoForm } from "@/schemas/forms/servicoForm";
import { useUpload } from "@/hooks/http/useUpload";

export default function Servicos() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedService, setSelectedService] =
    useState<ServicoTuristicoFull | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] =
    useState<ServicoTuristicoFull | null>(null);

  const { data: servicos } = useGetAllServicos();

  const { mutateAsync: uploadFiles } = useUpload();

  const { mutateAsync: createServico } = useCreateServico();
  const { mutateAsync: updateServico } = useUpdateServico();
  const { mutateAsync: deleteServico } = useDeleteServico();
  const { mutateAsync: toggleAtivo, isPending: isTogglingAtivo } = useToggleAtivoServico();

  const handleOpenModal = (
    mode: "create" | "edit" | "view",
    service?: ServicoTuristicoFull | null
  ) => {
    setModalMode(mode);
    setSelectedService(service || null);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (service: ServicoTuristicoFull | null) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (serviceToDelete) {
      try {
        await deleteServico(serviceToDelete.id);
        toast({
          title: "Serviço excluído",
          description: `O serviço "${serviceToDelete.nome}" foi excluído com sucesso.`,
        });
        setIsDeleteModalOpen(false);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao excluir o serviço. Tente novamente.",
          variant: "destructive",
        });
        console.error("Erro ao excluir serviço:", error);
      }
    }
  };

  const handleSaveService = async (
    serviceData: ServicoForm & { fotos: File[] }
  ) => {
    try {
      const uploadedUrls = await Promise.all(
        (serviceData.fotos || []).map(async (file) => {
          const url = await uploadFiles(file);
          return url;
        })
      );

      if (modalMode === "create") {
        await createServico({
          ...serviceData,
          fotoUrl: uploadedUrls[0] || "",
        });
        toast({
          title: "Serviço criado",
          description: `O serviço "${serviceData?.servico.nome}" foi criado com sucesso.`,
        });
      } else if (modalMode === "edit") {
        await updateServico({
          ...serviceData,
          fotoUrl: uploadedUrls[0] || ""
        });
        toast({
          title: "Serviço atualizado",
          description: `O serviço "${serviceData.servico.nome}" foi atualizado com sucesso.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o serviço. Tente novamente.",
        variant: "destructive",
      });
      console.error("Erro ao salvar serviço:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Serviços Turísticos
          </h2>
          <p className="text-muted-foreground">
            Gerencie os serviços turísticos disponíveis.
          </p>
        </div>
        <Button
          className="bg-tourism-primary"
          onClick={() => handleOpenModal("create")}
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicos?.map((servico: ServicoTuristicoFull) => (
                <TableRow key={servico.id}>
                  <TableCell className="font-medium">{servico.id}</TableCell>
                  <TableCell>{servico.nome}</TableCell>
                  <TableCell>{servico.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={servico.ativo ? "default" : "secondary"}>
                      {servico.ativo ? "Visível" : "Oculto"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenModal("view", servico)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Visualizar</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenModal("edit", servico)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          size="sm"
                          checked={servico.ativo}
                          disabled={isTogglingAtivo}
                          onCheckedChange={(checked) =>
                            toggleAtivo({ id: servico.id, ativo: checked })
                              .then(() => toast({ title: checked ? "Serviço visível no site público" : "Serviço ocultado do site público" }))
                              .catch(() => toast({ title: "Erro ao alterar visibilidade", variant: "destructive" }))
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent>{servico.ativo ? "Ocultar no site público" : "Exibir no site público"}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleOpenDeleteModal(servico)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir</TooltipContent>
                    </Tooltip>
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
        initialData={selectedService ?? undefined}
        onSave={handleSaveService}
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
