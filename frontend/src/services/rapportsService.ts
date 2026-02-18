import api from './api';
import { Rapport, RapportFormData, RapportsResponse, RapportDetailResponse } from '../types/rapport';

export const rapportsService = {
  // Récupérer tous les rapports
  getAll: async (filters?: {
    search?: string;
    statut?: string;
    typeRapport?: string;
    page?: number;
    limit?: number;
  }): Promise<RapportsResponse> => {
    const response = await api.get<RapportsResponse>('/rapports', { params: filters });
    return response.data;
  },

  // Récupérer un rapport par ID
  getById: async (id: string): Promise<Rapport> => {
    const response = await api.get<RapportDetailResponse>(`/rapports/${id}`);
    return response.data.rapport;
  },

  // Créer un rapport
  create: async (data: RapportFormData): Promise<Rapport> => {
    const response = await api.post('/rapports', data);
    return response.data.rapport;
  },

  // Modifier un rapport
  update: async (id: string, data: Partial<RapportFormData>): Promise<Rapport> => {
    const response = await api.put(`/rapports/${id}`, data);
    return response.data.rapport;
  },

  // Supprimer un rapport
  delete: async (id: string): Promise<void> => {
    await api.delete(`/rapports/${id}`);
  },

  // Changer le statut d'un rapport
  updateStatut: async (id: string, statut: string): Promise<Rapport> => {
    const response = await api.patch(`/rapports/${id}/statut`, { statut });
    return response.data.rapport;
  },
};
