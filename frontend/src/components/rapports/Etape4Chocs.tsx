import { useState } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Package } from 'lucide-react';
import { calculerMainOeuvreChoc, formaterMontant } from '@/services/calculRapport.service';

interface Fourniture {
  designation: string;
  reference: string;
  quantite: number;
  prixUnitaire: number;
  prixTotal: number;
}

interface Choc {
  nomChoc: string;
  description: string;
  tempsReparation: number;
  tauxHoraire: number;
  montantPeinture: number;
  fournitures: Fourniture[];
}

interface Etape4Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export default function Etape4Chocs({ register, watch, setValue }: Etape4Props) {
  const chocs = watch('chocs') || [];

  // Ajouter un nouveau choc
  const ajouterChoc = () => {
    const nouveauChoc: Choc = {
      nomChoc: '',
      description: '',
      tempsReparation: 0,
      tauxHoraire: 5000, // Valeur par défaut : 5000 FCFA/heure
      montantPeinture: 0,
      fournitures: [],
    };
    setValue('chocs', [...chocs, nouveauChoc]);
  };

  // Supprimer un choc
  const supprimerChoc = (index: number) => {
    const nouveauxChocs = chocs.filter((_: any, i: number) => i !== index);
    setValue('chocs', nouveauxChocs);
  };

  // Ajouter une fourniture à un choc
  const ajouterFourniture = (chocIndex: number) => {
    const nouvelleFourniture: Fourniture = {
      designation: '',
      reference: '',
      quantite: 1,
      prixUnitaire: 0,
      prixTotal: 0,
    };
    
    const nouveauxChocs = [...chocs];
    if (!nouveauxChocs[chocIndex].fournitures) {
      nouveauxChocs[chocIndex].fournitures = [];
    }
    nouveauxChocs[chocIndex].fournitures.push(nouvelleFourniture);
    setValue('chocs', nouveauxChocs);
  };

  // Supprimer une fourniture
  const supprimerFourniture = (chocIndex: number, fournitureIndex: number) => {
    const nouveauxChocs = [...chocs];
    nouveauxChocs[chocIndex].fournitures = nouveauxChocs[chocIndex].fournitures.filter(
      (_: any, i: number) => i !== fournitureIndex
    );
    setValue('chocs', nouveauxChocs);
  };

  // Calculer le prix total d'une fourniture
  const calculerPrixTotal = (chocIndex: number, fournitureIndex: number) => {
    const choc = chocs[chocIndex];
    const fourniture = choc.fournitures[fournitureIndex];
    const prixTotal = fourniture.quantite * fourniture.prixUnitaire;
    
    const nouveauxChocs = [...chocs];
    nouveauxChocs[chocIndex].fournitures[fournitureIndex].prixTotal = prixTotal;
    setValue('chocs', nouveauxChocs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <Package className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-orange-900 mb-1">Chocs et relevés de dégâts</h3>
          <p className="text-sm text-orange-700">
            Décrivez chaque zone endommagée avec les réparations nécessaires et le prix de la main d'œuvre.
          </p>
        </div>
      </div>

      {/* Liste des chocs */}
      {chocs.map((choc: Choc, chocIndex: number) => (
        <Card key={chocIndex} className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Choc #{chocIndex + 1}
              </h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => supprimerChoc(chocIndex)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>

            <div className="space-y-4">
              {/* Nom du choc */}
              <div>
                <Label htmlFor={`chocs.${chocIndex}.nomChoc`}>
                  Nom du choc <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`chocs.${chocIndex}.nomChoc`}
                  placeholder="Ex: Choc avant droit, Tôlerie, Mécanique..."
                  {...register(`chocs.${chocIndex}.nomChoc`, {
                    required: 'Le nom du choc est obligatoire',
                  })}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor={`chocs.${chocIndex}.description`}>
                  Description des dégâts
                </Label>
                <Textarea
                  id={`chocs.${chocIndex}.description`}
                  placeholder="Décrivez les dégâts constatés..."
                  rows={3}
                  {...register(`chocs.${chocIndex}.description`)}
                />
              </div>

              {/* Temps réparation + Taux horaire + Peinture */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                {/* Temps de réparation */}
                <div>
                  <Label htmlFor={`chocs.${chocIndex}.tempsReparation`}>
                    Temps réparation (heures) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`chocs.${chocIndex}.tempsReparation`}
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="Ex: 5.5"
                    {...register(`chocs.${chocIndex}.tempsReparation`, {
                      required: 'Le temps est obligatoire',
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Nombre d'heures de main d'œuvre</p>
                </div>

                {/* Taux horaire */}
                <div>
                  <Label htmlFor={`chocs.${chocIndex}.tauxHoraire`}>
                    Prix horaire MO (FCFA) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`chocs.${chocIndex}.tauxHoraire`}
                    type="number"
                    step="100"
                    min="0"
                    placeholder="Ex: 5000"
                    {...register(`chocs.${chocIndex}.tauxHoraire`, {
                      required: 'Le taux horaire est obligatoire',
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Prix par heure de travail</p>
                </div>

                {/* Montant peinture */}
                <div>
                  <Label htmlFor={`chocs.${chocIndex}.montantPeinture`}>
                    Peinture (FCFA)
                  </Label>
                  <Input
                    id={`chocs.${chocIndex}.montantPeinture`}
                    type="number"
                    step="100"
                    min="0"
                    placeholder="Ex: 50000"
                    {...register(`chocs.${chocIndex}.montantPeinture`, {
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Coût de la peinture</p>
                </div>
              </div>

              {/* Calcul main d'œuvre pour ce choc */}
              {choc.tempsReparation > 0 && choc.tauxHoraire > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900">
                    💰 Main d'œuvre pour ce choc : {' '}
                    {formaterMontant(calculerMainOeuvreChoc(choc.tempsReparation, choc.tauxHoraire))}
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Calcul : {choc.tempsReparation}h × {formaterMontant(choc.tauxHoraire)}/h
                  </p>
                </div>
              )}

              {/* Fournitures */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Pièces et fournitures</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => ajouterFourniture(chocIndex)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une pièce
                  </Button>
                </div>

                {choc.fournitures && choc.fournitures.length > 0 ? (
                  <div className="space-y-3">
                    {choc.fournitures.map((fourniture: Fourniture, fournitureIndex: number) => (
                      <div
                        key={fournitureIndex}
                        className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-lg"
                      >
                        {/* Désignation */}
                        <div className="col-span-4">
                          <Input
                            placeholder="Désignation"
                            {...register(
                              `chocs.${chocIndex}.fournitures.${fournitureIndex}.designation`
                            )}
                          />
                        </div>

                        {/* Référence */}
                        <div className="col-span-2">
                          <Input
                            placeholder="Référence"
                            {...register(
                              `chocs.${chocIndex}.fournitures.${fournitureIndex}.reference`
                            )}
                          />
                        </div>

                        {/* Quantité */}
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="1"
                            placeholder="Qté"
                            {...register(
                              `chocs.${chocIndex}.fournitures.${fournitureIndex}.quantite`,
                              {
                                valueAsNumber: true,
                                onChange: () => calculerPrixTotal(chocIndex, fournitureIndex),
                              }
                            )}
                          />
                        </div>

                        {/* Prix unitaire */}
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            placeholder="Prix unit."
                            {...register(
                              `chocs.${chocIndex}.fournitures.${fournitureIndex}.prixUnitaire`,
                              {
                                valueAsNumber: true,
                                onChange: () => calculerPrixTotal(chocIndex, fournitureIndex),
                              }
                            )}
                          />
                        </div>

                        {/* Prix total (calculé automatiquement) */}
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-600">
                            {formaterMontant(fourniture.prixTotal || 0)}
                          </span>
                        </div>

                        {/* Bouton supprimer */}
                        <div className="col-span-1 flex items-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => supprimerFourniture(chocIndex, fournitureIndex)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Aucune pièce ajoutée. Cliquez sur "Ajouter une pièce" pour commencer.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Bouton ajouter un choc */}
      <Button type="button" onClick={ajouterChoc} className="w-full" size="lg">
        <Plus className="w-5 h-5 mr-2" />
        Ajouter un choc
      </Button>

      {chocs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Aucun choc ajouté. Cliquez sur "Ajouter un choc" pour commencer.</p>
        </div>
      )}
    </div>
  );
}
