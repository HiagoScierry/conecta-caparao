import { useQuery } from "@tanstack/react-query";

export function useGetAllAtrativos() {
  return useQuery({
    queryKey: ['atrativos'],
    queryFn: async () => {
      const response = await fetch('/api/atrativos');

      if (!response.ok) {
        throw new Error('Erro ao buscar atrações');
      }

      return response.json();
    }
  });
}

