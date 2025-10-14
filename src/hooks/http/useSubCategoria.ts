import { Subcategoria } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useSubcategorias(){
  return useQuery<Subcategoria[], Error>({
    queryKey: ["subcategorias"],
    queryFn: async () => {
      const response = await fetch("/api/subcategorias");
      if (!response.ok) {
        throw new Error("Failed to fetch subcategorias");
      }
      return response.json();
    }
  });
}
