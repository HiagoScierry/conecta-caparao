import { Categoria } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./useQueryInvalidation";

export function useCategorias(){
  return useQuery<Categoria[], Error>({
    queryKey: QUERY_KEYS.CATEGORIAS,
    queryFn: async () => {
      const response = await fetch("/api/categorias");
      if (!response.ok) {
        throw new Error("Failed to fetch categorias");
      }
      return response.json();
    }
  });
}
