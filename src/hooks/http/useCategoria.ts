import { Categoria } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useCategorias(){
  return useQuery<Categoria[], Error>({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await fetch("/api/categorias");
      if (!response.ok) {
        throw new Error("Failed to fetch categorias");
      }
      return response.json();
    }
  });
}
