import { MunicipioForm } from "@/forms/municipioForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetAllMunicipios = () => {
  return useQuery({
    queryKey: ['municipios'],
    queryFn: async () => {
      const response = await fetch('/api/municipio');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      return json
    }
  });
};


export const useGetMunicipioById = (id: string) => {
  return useQuery({
    queryKey: ['municipio', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch(`/api/municipio/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      return json;
    },
    enabled: !!id,
  });
}

export const useCreateMunicipio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (municipioForm: MunicipioForm) => {
      const response = await fetch('/api/municipio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(municipioForm),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    }
  });
};

export const useUpdateMunicipio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedMunicipio: MunicipioForm) => {
      // Simulating an API call
      const response = await fetch(`/api/municipio/${updatedMunicipio.municipio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMunicipio),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    }
  });
}
export const useDeleteMunicipio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Simulating an API call
      const response = await fetch(`/api/municipio/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['municipios'] });
    },
  });
}