import { NoticiasForm } from "@/forms/noticiasForm";
import { NoticiaFull } from "@/repositories/interfaces/INoticiaRepository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useQueryInvalidation } from "./useQueryInvalidation";

export function useGetNoticias() {
  return useQuery<NoticiaFull[], Error>({
    queryKey: QUERY_KEYS.NOTICIAS,
    queryFn: async () => {
      const response = await fetch("/api/noticia");
      if (!response.ok) {
        throw new Error("Erro ao buscar notícias");
      }
      return response.json();
    },
  })
}


export function useGetNoticiaById(id: number) {
  return useQuery<NoticiaFull>({
    queryKey: QUERY_KEYS.NOTICIA(id),
    queryFn: async () => {
      const response = await fetch(`/api/noticia/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar notícia");
      }
      return response.json();
    },
    enabled: !!id,
  })
}

export function useCreateNoticia() {
  const { invalidateNoticias, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: NoticiasForm & { fotosUrl: string[]}) => {
      const response = await fetch("/api/noticia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar notícia");
      }
      return response.json();
    },
    onSuccess: () => {
      invalidateNoticias();
      invalidateDashboard();
    }
  })
}

export function useUpdateNoticia() {
  const { invalidateNoticias, invalidateDashboard, invalidateNoticia } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (data: NoticiasForm & {fotosUrl: string[] }) => {
      const response = await fetch(`/api/noticia/${data.noticia.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar notícia");
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      invalidateNoticias();
      invalidateDashboard();
      // Também invalida a notícia específica que foi atualizada
      if (variables.noticia.id) {
        invalidateNoticia(variables.noticia.id);
      }
    }
  })
}

export function useDeleteNoticia() {
  const { invalidateNoticias, invalidateDashboard } = useQueryInvalidation();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/noticia/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar notícia");
      }
      return response.json();
    },
    onSuccess: () => {
      invalidateNoticias();
      invalidateDashboard();
    }
  })
}