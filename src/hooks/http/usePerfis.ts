import { PerfilCliente } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function usePerfis() {
  return useQuery<PerfilCliente[], Error>({
    queryKey: ["perfis"],
    queryFn: async () => {
      const response = await fetch("/api/perfis");
      if (!response.ok) {
        throw new Error("Failed to fetch perfis");
      }
      return response.json();
    }
  })
}
