// Service de calculs pour les rapports d'expertise

export interface CalculRapportParams {
  chocs: Array<{
    tempsReparation: number;
    montantPeinture: number;
    fournitures?: Array<{
      quantite: number;
      prixUnitaire: number;
    }>;
  }>;
  ageVehicule?: number; // En années
  tauxHoraireMecanique?: number;
  tauxHoraireTolerie?: number;
}

export interface ResultatCalcul {
  moMecanique: number;
  moTolerie: number;
  totalFournitures: number;
  totalPeinture: number;
  sousTotal: number;
  vetuste: number;
  tauxVetuste: number;
  montantTotal: number;
}

// Taux horaires par défaut (en CFA)
const TAUX_HORAIRE_MECANIQUE = 4000;
const TAUX_HORAIRE_TOLERIE = 4000;

// Barème de vétusté par âge du véhicule
const BAREME_VETUSTE: Record<number, number> = {
  0: 0,    // Neuf
  1: 10,   // 1 an
  2: 15,   // 2 ans
  3: 20,   // 3 ans
  4: 25,   // 4 ans
  5: 30,   // 5 ans et plus
};

/**
 * Calcule le taux de vétusté en fonction de l'âge du véhicule
 */
function calculerTauxVetuste(ageVehicule: number): number {
  if (ageVehicule >= 5) return BAREME_VETUSTE[5];
  return BAREME_VETUSTE[ageVehicule] || 0;
}

/**
 * Calcule tous les montants du rapport
 */
export function calculerMontantsRapport(params: CalculRapportParams): ResultatCalcul {
  const {
    chocs,
    ageVehicule = 0,
    tauxHoraireMecanique = TAUX_HORAIRE_MECANIQUE,
    tauxHoraireTolerie = TAUX_HORAIRE_TOLERIE,
  } = params;

  // 1. Main d'œuvre
  const tempsTotal = chocs.reduce((sum, choc) => sum + (choc.tempsReparation || 0), 0);
  const moMecanique = tempsTotal * tauxHoraireMecanique;
  const moTolerie = 0; // À séparer si nécessaire

  // 2. Fournitures
  const totalFournitures = chocs.reduce((sum, choc) => {
    if (!choc.fournitures) return sum;
    const totalChoc = choc.fournitures.reduce(
      (fournitureSum, f) => fournitureSum + (f.quantite * f.prixUnitaire),
      0
    );
    return sum + totalChoc;
  }, 0);

  // 3. Peinture
  const totalPeinture = chocs.reduce((sum, choc) => sum + (choc.montantPeinture || 0), 0);

  // 4. Sous-total (avant vétusté)
  const sousTotal = moMecanique + moTolerie + totalFournitures + totalPeinture;

  // 5. Vétusté
  const tauxVetuste = calculerTauxVetuste(ageVehicule);
  const vetuste = (sousTotal * tauxVetuste) / 100;

  // 6. Total final
  const montantTotal = sousTotal - vetuste;

  return {
    moMecanique,
    moTolerie,
    totalFournitures,
    totalPeinture,
    sousTotal,
    vetuste,
    tauxVetuste,
    montantTotal: Math.round(montantTotal),
  };
}

/**
 * Calcule l'âge du véhicule en années
 */
export function calculerAgeVehicule(dateMiseCirculation: string): number {
  const dateMEC = new Date(dateMiseCirculation);
  const maintenant = new Date();
  const diffAnnees = maintenant.getFullYear() - dateMEC.getFullYear();
  return diffAnnees;
}
