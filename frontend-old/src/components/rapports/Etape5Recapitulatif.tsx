import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Car, User, AlertCircle } from 'lucide-react';

interface Etape5Props {
  formData: any;
}

export const Etape5Recapitulatif = ({ formData }: Etape5Props) => {
  const { typeRapport, numeroOrdreService, numeroSinistre, dateSinistre, dateVisite, vehicule, assure, chocs } = formData;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-green-900 mb-1">Récapitulatif du rapport</h3>
          <p className="text-sm text-green-700">
            Vérifiez toutes les informations avant de créer le rapport.
          </p>
        </div>
      </div>

      {/* Informations générales */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Informations générales</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Type de rapport</p>
              <p className="font-medium">{typeRapport?.replace('_', ' ') || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">N° Ordre de Service</p>
              <p className="font-medium font-mono">{numeroOrdreService || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">N° de Sinistre</p>
              <p className="font-medium font-mono">{numeroSinistre || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date du Sinistre</p>
              <p className="font-medium">{dateSinistre ? new Date(dateSinistre).toLocaleDateString('fr-FR') : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date de Visite</p>
              <p className="font-medium">{dateVisite ? new Date(dateVisite).toLocaleDateString('fr-FR') : '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Véhicule */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-green-600" />
            <CardTitle className="text-lg">Véhicule</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Marque et Modèle</p>
              <p className="font-medium">{vehicule?.marque} {vehicule?.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Genre</p>
              <p className="font-medium">{vehicule?.genre || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Immatriculation</p>
              <p className="font-medium font-mono uppercase">{vehicule?.immatriculation || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">N° de Chassis</p>
              <p className="font-medium font-mono text-xs">{vehicule?.numeroChasis || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kilométrage</p>
              <p className="font-medium">{vehicule?.kilometrage ? `${parseInt(vehicule.kilometrage).toLocaleString()} km` : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Couleur</p>
              <p className="font-medium">{vehicule?.couleur || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Source d'énergie</p>
              <p className="font-medium">{vehicule?.sourceEnergie || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Puissance</p>
              <p className="font-medium">{vehicule?.puissanceFiscale ? `${vehicule.puissanceFiscale} CV` : '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assuré */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">Assuré / Propriétaire</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom et Prénom</p>
              <p className="font-medium">{assure?.nom} {assure?.prenom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium">{assure?.telephone || '-'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Adresse</p>
              <p className="font-medium">{assure?.adresse || '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chocs */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-lg">Chocs et Dégâts ({chocs?.length || 0})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {chocs && chocs.length > 0 ? (
            <div className="space-y-4">
              {chocs.map((choc: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">#{index + 1} - {choc.nomChoc}</h4>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-600">{choc.tempsReparation}h</span>
                      <span className="text-gray-600">{parseInt(choc.montantPeinture || 0).toLocaleString()} CFA</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{choc.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun choc ajouté</p>
          )}
        </CardContent>
      </Card>

      {/* Avertissement final */}
      <Card className="bg-yellow-50 border-yellow-300">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <p className="font-semibold text-yellow-900 mb-2">Avant de valider</p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>✓ Vérifiez que toutes les informations sont correctes</li>
                <li>✓ Le rapport sera créé avec le statut "BROUILLON"</li>
                <li>✓ Vous pourrez le modifier ultérieurement</li>
                <li>✓ Pensez à sauvegarder régulièrement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
