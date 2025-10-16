import { EventoForm } from "@/forms/eventoForm";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

export function useEvento() {
  return useQuery<EventoFull[]>({
    queryKey: QUERY_KEYS.EVENTOS,
    queryFn: async () => {
      const response = await fetch("/api/eventos");
      if (!response.ok) {
        throw new Error("Failed to fetch eventos");
      }
      return response.json();
    }
  });
}

export function useGetEventoById(id: number) {
  return useQuery<EventoFull>({
    queryKey: QUERY_KEYS.EVENTO(id),
    queryFn: async () => {
      const response = await fetch(`/api/eventos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch evento");
      }
      return response.json();
    },
    enabled: !!id,
  });
}


export function useCreateEvento() {
  const { invalidateEventos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: EventoForm & { fotosUrl: string[]}) => {
      const response = await fetch("/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create evento");
      }
      return response.json();
    },
    onSuccess: () => {
      invalidateEventos();
      invalidateDashboard();
    }
  })
}


export function useUpdateEvento() {
  const { invalidateEventos, invalidateDashboard, invalidateEvento } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: EventoForm & { fotosUrl?: string[] }) => {
      const response = await fetch(`/api/eventos/${data.evento?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update evento");
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      invalidateEventos();
      invalidateDashboard();
      // Também invalida o evento específico que foi atualizado
      if (variables.evento?.id) {
        invalidateEvento(variables.evento.id);
      }
    }
  })
}


export function useDeleteEvento() {
  const { invalidateEventos, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/eventos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete evento");
      }
      return response.json();
    },
    onSuccess: () => {
      invalidateEventos();
      invalidateDashboard();
    }
  })
}