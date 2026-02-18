// Types pour les bureaux (compagnies d'assurance)

export interface Bureau {
  id: string;
  code: string;
  nomAgence: string;
  responsableSinistres: string;
  telephone: string;
  email: string;
  adresse: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BureauFormData {
  code: string;
  nomAgence: string;
  responsableSinistres: string;
  telephone: string;
  email: string;
  adresse: string;
}

export interface BureauxResponse {
  bureaux: Bureau[];
}
