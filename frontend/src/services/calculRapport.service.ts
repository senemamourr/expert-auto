// Service de calcul des montants d'un rapport d'expertise

interface ChocCalcul {
  tempsReparation: number; // En heures
  tauxHoraire: number;     // Prix par heure en FCFA
  montantPeinture: number; // Montant peinture en FCFA
  fournitures: Array<{
    quantite: number;
    prixUnitaire: number;
  }>;
}

interface CalculRapportParams {
  chocs: ChocCalcul[];
  dateMiseCirculation: string; // Pour calculer l'âge du véhicule
}

export interface MontantsCalcules {
  // Détail main d'œuvre
  montantMainOeuvre: number;
  
  // Détail fournitures
  montantFournitures: number;
  
  // Détail peinture
  montantPeinture: number;
  
  // Sous-total (avant vétusté)
  sousTotal: number;
  
  // Vétusté
  ageVehicule: number;      // En années
  tauxVetuste: number;      // Pourcentage (0-30%)
  montantVetuste: number;   // Montant à déduire
  
  // Total final
  montantTotal: number;
}

/**
 * Calcule l'âge du véhicule en années
 */
function calculerAgeVehicule(dateMiseCirculation: string): number {
  const dateMEC = new Date(dateMiseCirculation);
  const aujourdhui = new Date();
  const ageEnMs = aujourdhui.getTime() - dateMEC.getTime();
  const ageEnAnnees = ageEnMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(ageEnAnnees);
}

/**
 * Calcule le taux de vétusté selon l'âge du véhicule
 * Barème : 0-5 ans = 0%, 6-10 ans = 10%, 11-15 ans = 20%, 16+ ans = 30%
 */
function calculerTauxVetuste(ageVehicule: number): number {
  if (ageVehicule <= 5) return 0;
  if (ageVehicule <= 10) return 10;
  if (ageVehicule <= 15) return 20;
  return 30;
}

/**
 * Calcule tous les montants d'un rapport d'expertise
 */
export function calculerMontantsRapport(params: CalculRapportParams): MontantsCalcules {
  const { chocs, dateMiseCirculation } = params;
  
  // 1. MAIN D'ŒUVRE
  // Formule : Σ (tempsReparation × tauxHoraire) pour chaque choc
  const montantMainOeuvre = chocs.reduce((total, choc) => {
    return total + (choc.tempsReparation * choc.tauxHoraire);
  }, 0);
  
  // 2. FOURNITURES
  // Formule : Σ (quantité × prixUnitaire) pour toutes les fournitures de tous les chocs
  const montantFournitures = chocs.reduce((total, choc) => {
    const totalChoc = choc.fournitures.reduce((totalFournitures, fourniture) => {
      return totalFournitures + (fourniture.quantite * fourniture.prixUnitaire);
    }, 0);
    return total + totalChoc;
  }, 0);
  
  // 3. PEINTURE
  // Formule : Σ montantPeinture pour chaque choc
  const montantPeinture = chocs.reduce((total, choc) => {
    return total + choc.montantPeinture;
  }, 0);
  
  // 4. SOUS-TOTAL (avant vétusté)
  const sousTotal = montantMainOeuvre + montantFournitures + montantPeinture;
  
  // 5. VÉTUSTÉ
  const ageVehicule = calculerAgeVehicule(dateMiseCirculation);
  const tauxVetuste = calculerTauxVetuste(ageVehicule);
  
  // La vétusté s'applique uniquement sur les fournitures
  const montantVetuste = (montantFournitures * tauxVetuste) / 100;
  
  // 6. TOTAL FINAL
  const montantTotal = sousTotal - montantVetuste;
  
  return {
    montantMainOeuvre: Math.round(montantMainOeuvre),
    montantFournitures: Math.round(montantFournitures),
    montantPeinture: Math.round(montantPeinture),
    sousTotal: Math.round(sousTotal),
    ageVehicule,
    tauxVetuste,
    montantVetuste: Math.round(montantVetuste),
    montantTotal: Math.round(montantTotal),
  };
}

/**
 * Formate un montant en FCFA avec espaces
 */
export function formaterMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant);
}

/**
 * Calcule le prix total d'une fourniture
 */
export function calculerPrixTotalFourniture(quantite: number, prixUnitaire: number): number {
  return quantite * prixUnitaire;
}

/**
 * Calcule le montant main d'œuvre pour un choc
 */
export function calculerMainOeuvreChoc(tempsReparation: number, tauxHoraire: number): number {
  return tempsReparation * tauxHoraire;
}
