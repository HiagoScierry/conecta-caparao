import { Subcategoria } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./useQueryInvalidation";

export function useSubcategorias(){
  return useQuery<Subcategoria[], Error>({
    queryKey: QUERY_KEYS.SUBCATEGORIAS,
    queryFn: async () => {
      const response = await fetch("/api/subcategorias");
      if (!response.ok) {
        throw new Error("Failed to fetch subcategorias");
      }
      return response.json();
    }
  });
}
