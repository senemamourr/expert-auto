import api from './api';
import { Bureau, BureauFormData, BureauxResponse } from '../types/bureau';

export const bureauxService = {
  // Récupérer tous les bureaux
  getAll: async (search?: string): Promise<Bureau[]> => {
    const params = search ? { search } : {};
    const response = await api.get<BureauxResponse>('/bureaux', { params });
    return response.data.bureaux;
  },

  // Récupérer un bureau par ID
  getById: async (id: string): Promise<Bureau> => {
    const response = await api.get(`/bureaux/${id}`);
    return response.data.bureau;
  },

  // Récupérer un bureau par code
  getByCode: async (code: string): Promise<Bureau> => {
    const response = await api.get(`/bureaux/code/${code}`);
    return response.data.bureau;
  },

  // Créer un bureau
  create: async (data: BureauFormData): Promise<Bureau> => {
    const response = await api.post('/bureaux', data);
    return response.data.bureau;
  },

  // Modifier un bureau
  update: async (id: string, data: Partial<BureauFormData>): Promise<Bureau> => {
    const response = await api.put(`/bureaux/${id}`, data);
    return response.data.bureau;
  },

  // Supprimer un bureau
  delete: async (id: string): Promise<void> => {
    await api.delete(`/bureaux/${id}`);
  },
};
