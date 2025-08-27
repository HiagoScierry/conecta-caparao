import { NoticiasForm } from "@/forms/noticiasForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetNoticias() {
  return useQuery({
    queryKey: ["noticias"],
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
  return useQuery({
    queryKey: ["noticia", id],
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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["noticias"] });
    }
  })
}

export function useUpdateNoticia() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noticias"] });
    }
  })
}

export function useDeleteNoticia() {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["noticias"] });
    }
  })
}