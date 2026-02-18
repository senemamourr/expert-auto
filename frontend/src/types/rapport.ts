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
  tauxHoraire: number;
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
  vehicule?: Vehicule;
  assure?: Assure;
  chocs?: Choc[];
  honoraires?: Honoraire;
  bureau?: any;
  user?: any;
}

export interface RapportFormData {
  typeRapport: TypeRapport;
  numeroOrdreService: string;
  bureauId: string;
  numeroSinistre: string;
  dateSinistre: string;
  dateVisite: string;
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
  assure: {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
  };
  chocs?: Array<{
    nomChoc: string;
    description: string;
    modeleVehiculeSvg?: string;
    tempsReparation: number;
    tauxHoraire: number;
    montantPeinture: number;
    ordre: number;
    fournitures?: Array<{
      designation: string;
      reference: string;
      quantite: number;
      prixUnitaire: number;
      prixTotal: number;
    }>;
  }>;
}

export interface RapportsResponse {
  rapports: Rapport[];
  total: number;
}

export interface RapportDetailResponse {
  rapport: Rapport;
}

export interface MontantsCalcules {
  montantMainOeuvre: number;
  montantFournitures: number;
  montantPeinture: number;
  sousTotal: number;
  tauxVetuste: number;
  montantVetuste: number;
  montantTotal: number;
}
