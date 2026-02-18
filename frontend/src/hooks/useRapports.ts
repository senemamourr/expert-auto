import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rapportsService } from '../services/rapportsService';
import { RapportFormData } from '../types/rapport';
import { toast } from 'sonner';

export const useRapports = (filters?: {
  search?: string;
  statut?: string;
  typeRapport?: string;
}) => {
  return useQuery({
    queryKey: ['rapports', filters],
    queryFn: () => rapportsService.getAll(filters),
  });
};

export const useRapport = (id: string) => {
  return useQuery({
    queryKey: ['rapport', id],
    queryFn: () => rapportsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateRapport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RapportFormData) => rapportsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rapports'] });
      toast.success('Rapport créé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la création du rapport');
    },
  });
};

export const useUpdateRapport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RapportFormData> }) =>
      rapportsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rapports'] });
      toast.success('Rapport modifié avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification du rapport');
    },
  });
};

export const useDeleteRapport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rapportsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rapports'] });
      toast.success('Rapport supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression du rapport');
    },
  });
};

export const useUpdateStatut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, statut }: { id: string; statut: string }) =>
      rapportsService.updateStatut(id, statut),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rapports'] });
      toast.success('Statut mis à jour');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut');
    },
  });
};
