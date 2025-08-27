import { useQuery } from "@tanstack/react-query";

export function useDash() {
  return useQuery({
    queryKey: ['dash'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do dashboard');
      }
      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60 * 1, // 1 minuto
  });
}
