import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bureauxService } from '../services/bureauxService';
import { Bureau, BureauFormData } from '../types/bureau';
import { toast } from 'sonner';

export const useBureaux = (search?: string) => {
  return useQuery({
    queryKey: ['bureaux', search],
    queryFn: () => bureauxService.getAll(search),
  });
};

export const useBureau = (id: string) => {
  return useQuery({
    queryKey: ['bureau', id],
    queryFn: () => bureauxService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBureau = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BureauFormData) => bureauxService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bureaux'] });
      toast.success('Bureau créé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la création du bureau');
    },
  });
};

export const useUpdateBureau = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BureauFormData> }) =>
      bureauxService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bureaux'] });
      toast.success('Bureau modifié avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification du bureau');
    },
  });
};

export const useDeleteBureau = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bureauxService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bureaux'] });
      toast.success('Bureau supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression du bureau');
    },
  });
};
