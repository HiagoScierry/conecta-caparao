import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsuarioForm, UsuarioUpdateForm } from "@/forms/usuarioForm";
import { usuarioCreateSchema, usuarioUpdateSchema } from "@/schemas/usuarioSchema";
import { UsuarioResponseDTO } from "@/dto/usuarioDTO";
import { Eye, Edit, Plus } from "lucide-react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  initialData?: UsuarioResponseDTO;
  onSave: (data: UsuarioForm | UsuarioUpdateForm) => Promise<void>;
  isLoading?: boolean;
}

export function UserModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
  isLoading = false,
}: UserModalProps) {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";
  const isEditMode = mode === "edit";

  const form = useForm<UsuarioForm | UsuarioUpdateForm>({
    resolver: zodResolver(isCreateMode ? usuarioCreateSchema : usuarioUpdateSchema),
    defaultValues: isCreateMode
      ? {
          nome: "",
          email: "",
          senha: "",
          admin: false,
        }
      : {
          nome: "",
          email: "",
          admin: false,
        },
  });

  useEffect(() => {
    if (initialData && (isEditMode || isViewMode)) {
      form.reset({
        nome: initialData.nome,
        email: initialData.email,
        admin: initialData.admin,
        ...(isEditMode && { senha: "" }),
      });
    } else if (isCreateMode) {
      form.reset({
        nome: "",
        email: "",
        senha: "",
        admin: false,
      });
    }
  }, [initialData, mode, form, isEditMode, isViewMode, isCreateMode]);

  const handleSubmit = async (data: UsuarioForm | UsuarioUpdateForm) => {
    await onSave(data);
    form.reset();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "Criar Usuário";
      case "edit":
        return "Editar Usuário";
      case "view":
        return "Detalhes do Usuário";
      default:
        return "";
    }
  };

  const getModalDescription = () => {
    switch (mode) {
      case "create":
        return "Preencha os dados para criar um novo usuário no sistema.";
      case "edit":
        return "Altere os dados do usuário conforme necessário.";
      case "view":
        return "Informações completas do usuário selecionado.";
      default:
        return "";
    }
  };

  const getModalIcon = () => {
    switch (mode) {
      case "create":
        return <Plus className="h-5 w-5 text-tourism-primary" />;
      case "edit":
        return <Edit className="h-5 w-5 text-tourism-primary" />;
      case "view":
        return <Eye className="h-5 w-5 text-tourism-primary" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getModalIcon()}
            <DialogTitle className="text-tourism-primary">{getModalTitle()}</DialogTitle>
          </div>
          <DialogDescription>
            {getModalDescription()}
          </DialogDescription>
        </DialogHeader>

        {isViewMode && initialData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome</label>
                <p className="text-base font-medium mt-1">{initialData.nome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-base mt-1">{initialData.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                <div className="mt-1">
                  <Badge 
                    variant="outline" 
                    className={initialData.admin 
                      ? "bg-tourism-light text-tourism-primary border-tourism-primary" 
                      : "bg-tourism-bege text-tourism-cinza border-tourism-cinza"
                    }
                  >
                    {initialData.admin ? "Administrador" : "Usuário"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Criação</label>
                  <p className="text-sm mt-1">{new Date(initialData.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Última Atualização</label>
                  <p className="text-sm mt-1">{new Date(initialData.updatedAt).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isCreateMode && (
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isEditMode && (
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha (opcional)</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Deixe em branco para manter a atual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="admin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Administrador
                      </FormLabel>
                      <FormDescription>
                        Permitir acesso total ao sistema
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-tourism-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-tourism-primary hover:bg-tourism-dark text-white"
                >
                  {isLoading 
                    ? (isCreateMode ? "Criando..." : "Salvando...") 
                    : (isCreateMode ? "Criar" : "Salvar")
                  }
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
