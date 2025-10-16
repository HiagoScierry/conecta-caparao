import { UsuarioForm, UsuarioUpdateForm } from "@/forms/usuarioForm";
import { UsuarioResponseDTO } from "@/dto/usuarioDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllUsuarios() {
  return useQuery<UsuarioResponseDTO[]>({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const response = await fetch("/api/usuarios");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      return response.json();
    },
  });
}

export function useGetUsuarioById(id: number) {
  return useQuery<UsuarioResponseDTO>({
    queryKey: ["usuario", id],
    queryFn: async () => {
      const response = await fetch(`/api/usuarios/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUsuario: UsuarioForm) => {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsuario),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao criar usuário");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UsuarioUpdateForm }) => {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao atualizar usuário");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      queryClient.invalidateQueries({ queryKey: ["usuario", variables.id] });
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao excluir usuário");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}
