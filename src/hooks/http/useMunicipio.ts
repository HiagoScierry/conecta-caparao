import { ContatoDTO } from "@/dto/contatoDTO";
import { MunicipioDTO } from "@/dto/municipioDTO";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UseQueryResult } from "@tanstack/react-query";

export function useGetAllMunicipios(): UseQueryResult<MunicipioDTO[], Error> {
  return useQuery<MunicipioDTO[], Error>({
    queryKey: ['municipios'],
    queryFn: async () => {
      const response = await fetch('/api/municipio');
      if (!response.ok) {
        throw new Error('Erro ao buscar municípios');
      }
      return response.json();
    }
  });
}

export function useCreateMunicipio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      municipio,
      contato,
      fotosUrl,
    }: {
      municipio: MunicipioDTO;
      contato: ContatoDTO;
      fotosUrl: string[];
    }) => {
      const response = await fetch('/api/municipio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ municipio, contato, fotosUrl }),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar município');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    },
    onError: (error) => {
      console.error('Error creating municipio:', error);
    },
  });
}

export function useUpdateMunicipio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      municipio,
      contato,
      fotosUrl,
    }: {
      id: string;
      municipio: MunicipioDTO;
      contato: ContatoDTO;
      fotosUrl: string[];
    }) => {
      const response = await fetch(`/api/municipio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ municipio, contato, fotosUrl }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar município');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    },
    onError: (error) => {
      console.error('Error updating municipio:', error);
    },
  });
}

export function useDeleteMunicipio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/municipio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar município');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    },
    onError: (error) => {
      console.error('Error deleting municipio:', error);
    },
  });
}