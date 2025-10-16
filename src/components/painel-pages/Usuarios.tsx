"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetAllUsuarios, useCreateUsuario, useUpdateUsuario, useDeleteUsuario } from "@/hooks/http/useUsuarios";
import { UsuarioForm, UsuarioUpdateForm } from "@/forms/usuarioForm";
import { UsuarioResponseDTO } from "@/dto/usuarioDTO";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { UserModal } from "@/components/modals/UserModal";

export default function Usuarios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<UsuarioResponseDTO | null>(null);
  const [usuarioToDelete, setUsuarioToDelete] = useState<UsuarioResponseDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { toast } = useToast();
  const { data: usuarios, isLoading } = useGetAllUsuarios();
  const createUsuario = useCreateUsuario();
  const updateUsuario = useUpdateUsuario();
  const deleteUsuario = useDeleteUsuario();

  const filteredUsuarios = usuarios?.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (mode: "create" | "edit" | "view", usuario?: UsuarioResponseDTO) => {
    setModalMode(mode);
    setSelectedUsuario(usuario || null);
    setIsModalOpen(true);
  };

  const handleSaveUsuario = async (data: UsuarioForm | UsuarioUpdateForm) => {
    try {
      if (modalMode === "create") {
        await createUsuario.mutateAsync(data as UsuarioForm);
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso!",
        });
      } else if (modalMode === "edit" && selectedUsuario) {
        await updateUsuario.mutateAsync({
          id: selectedUsuario.id,
          data: data as UsuarioUpdateForm,
        });
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso!",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar usuário",
        variant: "destructive",
      });
    }
  };

  const handleOpenDeleteModal = (usuario: UsuarioResponseDTO) => {
    setUsuarioToDelete(usuario);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUsuario = async () => {
    if (!usuarioToDelete) return;

    try {
      await deleteUsuario.mutateAsync(usuarioToDelete.id);
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao excluir usuário",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema.
          </p>
        </div>
        <Button
          className="bg-tourism-primary"
          onClick={() => handleOpenModal("create")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Todos os usuários cadastrados no sistema
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios?.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={usuario.admin 
                        ? "bg-tourism-light text-tourism-primary border-tourism-primary" 
                        : "bg-tourism-bege text-tourism-cinza border-tourism-cinza"
                      }
                    >
                      {usuario.admin ? "Administrador" : "Usuário"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("view", usuario)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal("edit", usuario)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleOpenDeleteModal(usuario)}
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

      {/* Modal Unificado de Usuário */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedUsuario || undefined}
        onSave={handleSaveUsuario}
        isLoading={createUsuario.isPending || updateUsuario.isPending}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUsuario}
        title="Excluir Usuário"
        description="Tem certeza que deseja excluir o usuário"
        itemName={usuarioToDelete?.nome}
      />
    </div>
  );
}
