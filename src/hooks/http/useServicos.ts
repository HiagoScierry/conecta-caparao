import { ServicoForm } from "@/forms/servicoForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

export function useGetAllServicos() {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICOS,
    queryFn: async () => {
      const response = await fetch('/api/servicos');
      if (!response.ok) {
        throw new Error('Erro ao buscar serviços');
      }
      return response.json();
    },
  });
}

export function useGetServicoById(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICO(id),
    queryFn: async () => {
      const response = await fetch(`/api/servicos/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar serviço');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateServico() {
  const { invalidateServicos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (newServico: ServicoForm & { fotoUrl: string }) => {
      await fetch('/api/servicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newServico}),
      });
    },
    onSuccess: () => {
      invalidateServicos();
      invalidateDashboard();
    },
  })
}

export function useUpdateServico() {
  const { invalidateServicos, invalidateDashboard, invalidateServico } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (updatedServico: ServicoForm & { fotoUrl: string }) => {
      const response = await fetch(`/api/servicos/${updatedServico.servico.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServico),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar serviço');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      invalidateServicos();
      invalidateDashboard();
      // Também invalida o serviço específico que foi atualizado
      if (variables.servico.id) {
        invalidateServico(variables.servico.id);
      }
    },
  })
}

export function useDeleteServico() {
  const { invalidateServicos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/servicos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar serviço');
      }
      return response.text();
    },
    onSuccess: () => {
      invalidateServicos();
      invalidateDashboard();
    },
  })
}
