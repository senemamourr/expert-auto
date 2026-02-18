import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculerMontantsRapport, formaterMontant } from '@/services/calculRapport.service';
import { FileText, Calculator } from 'lucide-react';

interface Etape5Props {
  watch: UseFormWatch<any>;
}

export default function Etape5Recapitulatif({ watch }: Etape5Props) {
  const chocs = watch('chocs') || [];
  const dateMiseCirculation = watch('vehicule.dateMiseCirculation');

  // Calculer les montants
  const montants = useMemo(() => {
    if (!chocs.length || !dateMiseCirculation) {
      return {
        montantMainOeuvre: 0,
        montantFournitures: 0,
        montantPeinture: 0,
        sousTotal: 0,
        ageVehicule: 0,
        tauxVetuste: 0,
        montantVetuste: 0,
        montantTotal: 0,
      };
    }

    return calculerMontantsRapport({
      chocs,
      dateMiseCirculation,
    });
  }, [chocs, dateMiseCirculation]);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <FileText className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-purple-900 mb-1">Récapitulatif et évaluation</h3>
          <p className="text-sm text-purple-700">
            Vérifiez les montants calculés automatiquement avant de créer le rapport.
          </p>
        </div>
      </div>

      {/* Détail par choc */}
      {chocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Détail par choc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chocs.map((choc: any, index: number) => {
                const moChoc = choc.tempsReparation * choc.tauxHoraire;
                const fournituresChoc = (choc.fournitures || []).reduce(
                  (total: number, f: any) => total + (f.quantite * f.prixUnitaire),
                  0
                );

                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {choc.nomChoc || `Choc #${index + 1}`}
                    </h4>

                    <div className="space-y-2 text-sm">
                      {/* Main d'œuvre */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Main d'œuvre ({choc.tempsReparation}h × {formaterMontant(choc.tauxHoraire)}/h)
                        </span>
                        <span className="font-semibold">{formaterMontant(moChoc)}</span>
                      </div>

                      {/* Fournitures */}
                      {choc.fournitures && choc.fournitures.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Fournitures ({choc.fournitures.length} pièce(s))
                          </span>
                          <span className="font-semibold">{formaterMontant(fournituresChoc)}</span>
                        </div>
                      )}

                      {/* Peinture */}
                      {choc.montantPeinture > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Peinture</span>
                          <span className="font-semibold">{formaterMontant(choc.montantPeinture)}</span>
                        </div>
                      )}

                      {/* Total choc */}
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">Total choc</span>
                        <span className="font-bold text-blue-600">
                          {formaterMontant(moChoc + fournituresChoc + choc.montantPeinture)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Récapitulatif global */}
      <Card className="border-2 border-blue-500">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-900">Récapitulatif Global</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {/* Main d'œuvre totale */}
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-semibold text-gray-900">Main d'œuvre totale</p>
                <p className="text-xs text-gray-500">Somme de tous les temps × taux horaires</p>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formaterMontant(montants.montantMainOeuvre)}
              </p>
            </div>

            {/* Fournitures totales */}
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-semibold text-gray-900">Fournitures totales</p>
                <p className="text-xs text-gray-500">Toutes les pièces nécessaires</p>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formaterMontant(montants.montantFournitures)}
              </p>
            </div>

            {/* Peinture totale */}
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-semibold text-gray-900">Peinture totale</p>
                <p className="text-xs text-gray-500">Coûts de peinture</p>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formaterMontant(montants.montantPeinture)}
              </p>
            </div>

            {/* Sous-total */}
            <div className="flex justify-between items-center py-3 border-b bg-gray-50 px-4 -mx-6">
              <p className="font-bold text-gray-900 text-lg">Sous-total (avant vétusté)</p>
              <p className="text-2xl font-bold text-gray-900">
                {formaterMontant(montants.sousTotal)}
              </p>
            </div>

            {/* Vétusté */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-orange-900">Vétusté</p>
                  <p className="text-xs text-orange-700">
                    Véhicule de {montants.ageVehicule} an(s) - Taux : {montants.tauxVetuste}%
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    (Appliqué uniquement sur les fournitures)
                  </p>
                </div>
                <p className="text-xl font-bold text-orange-600">
                  - {formaterMontant(montants.montantVetuste)}
                </p>
              </div>
            </div>

            {/* Total final */}
            <div className="flex justify-between items-center py-4 bg-green-100 px-4 -mx-6 rounded-lg border-2 border-green-500">
              <div>
                <p className="font-bold text-green-900 text-xl">MONTANT TOTAL</p>
                <p className="text-xs text-green-700">À facturer au client</p>
              </div>
              <p className="text-3xl font-bold text-green-700">
                {formaterMontant(montants.montantTotal)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barème de vétusté */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Barème de vétusté appliqué</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="font-semibold">0-5 ans</p>
              <p className="text-2xl font-bold text-green-600">0%</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded">
              <p className="font-semibold">6-10 ans</p>
              <p className="text-2xl font-bold text-yellow-600">10%</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded">
              <p className="font-semibold">11-15 ans</p>
              <p className="text-2xl font-bold text-orange-600">20%</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded">
              <p className="font-semibold">16+ ans</p>
              <p className="text-2xl font-bold text-red-600">30%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
