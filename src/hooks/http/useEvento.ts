import { EventoForm } from "@/forms/eventoForm";
import { EventoFull } from "@/repositories/interfaces/IEventoRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEvento() {
  return useQuery<EventoFull[]>({
    queryKey: ["eventos"],
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
    queryKey: ["evento", id],
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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    }
  })
}


export function useUpdateEvento() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    }
  })
}


export function useDeleteEvento() {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    }
  })
}