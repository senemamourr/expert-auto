export enum TypeRapport {
  ESTIMATIF_REPARATION = 'estimatif_reparation',
  VALEUR_VENALE = 'valeur_venale',
  TIERCE_EXPERTISE = 'tierce_expertise',
}

export enum StatutRapport {
  BROUILLON = 'brouillon',
  EN_COURS = 'en_cours',
  TERMINE = 'termine',
  ARCHIVE = 'archive',
}

export enum GenreVehicule {
  VP = 'VP',
  VU = 'VU',
  CAMION = 'Camion',
  MOTO = 'Moto',
  AUTRE = 'Autre',
}

export interface Vehicule {
  id: string;
  rapportId: string;
  marque: string;
  type: string;
  genre: GenreVehicule;
  immatriculation: string;
  numeroChasis: string;
  kilometrage: number;
  dateMiseCirculation: string;
  couleur: string;
  sourceEnergie: string;
  puissanceFiscale: number;
  valeurNeuve: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Assure {
  id: string;
  rapportId: string;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Choc {
  id: string;
  rapportId: string;
  nomChoc: string;
  description: string;
  modeleVehiculeSvg?: string;
  tempsReparation: number;
  montantPeinture: number;
  ordre: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Fourniture {
  id: string;
  chocId: string;
  designation: string;
  reference: string;
  quantite: number;
  prixUnitaire: number;
  prixTotal: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Honoraire {
  id: string;
  rapportId: string;
  montantBase: number;
  fraisDeplacement: number;
  kilometres: number;
  montantTotal: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rapport {
  id: string;
  typeRapport: TypeRapport;
  numeroOrdreService: string;
  bureauId: string;
  numeroSinistre: string;
  dateSinistre: string;
  dateVisite: string;
  statut: StatutRapport;
  montantTotal: number;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  
  // Relations
  vehicule?: Vehicule;
  assure?: Assure;
  chocs?: Choc[];
  honoraires?: Honoraire;
  bureau?: any;
  user?: any;
}

export interface RapportFormData {
  // Étape 1 : Renseignements
  typeRapport: TypeRapport;
  numeroOrdreService: string;
  bureauId: string;
  numeroSinistre: string;
  dateSinistre: string;
  dateVisite: string;
  
  // Étape 2 : Véhicule
  vehicule: {
    marque: string;
    type: string;
    genre: GenreVehicule;
    immatriculation: string;
    numeroChasis: string;
    kilometrage: number;
    dateMiseCirculation: string;
    couleur: string;
    sourceEnergie: string;
    puissanceFiscale: number;
    valeurNeuve: number;
  };
  
  // Étape 3 : Assuré
  assure: {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
  };
}

export interface RapportsResponse {
  rapports: Rapport[];
  total: number;
}

export interface RapportDetailResponse {
  rapport: Rapport;
}
