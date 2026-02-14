import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Plus, Trash2, Package } from 'lucide-react';

interface Etape4Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  chocsArray: UseFieldArrayReturn<any, 'chocs', 'id'>;
  control: any;
}

export const Etape4Chocs = ({ register, errors, chocsArray, control }: Etape4Props) => {
  const { fields, append, remove } = chocsArray;

  const ajouterChoc = () => {
    append({
      nomChoc: '',
      description: '',
      tempsReparation: 0,
      montantPeinture: 0,
      fournitures: [],
    });
  };

  const ajouterFourniture = (chocIndex: number, fournitures: any[]) => {
    const newFournitures = [...fournitures, {
      designation: '',
      reference: '',
      quantite: 1,
      prixUnitaire: 0,
    }];
    return newFournitures;
  };

  const supprimerFourniture = (chocIndex: number, fournitureIndex: number, fournitures: any[]) => {
    return fournitures.filter((_, index) => index !== fournitureIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-orange-900 mb-1">Chocs, dégâts et fournitures</h3>
          <p className="text-sm text-orange-700">
            Décrivez chaque zone endommagée et ajoutez les pièces nécessaires avec leurs prix.
          </p>
        </div>
      </div>

      {/* Liste des chocs */}
      <div className="space-y-6">
        {fields.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">Aucun choc ajouté</p>
              <Button onClick={ajouterChoc} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter le premier choc
              </Button>
            </CardContent>
          </Card>
        ) : (
          fields.map((field: any, chocIndex) => (
            <Card key={field.id} className="border-l-4 border-l-orange-500">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Choc #{chocIndex + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(chocIndex)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer le choc
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Informations du choc */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Nom du choc */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Nom du choc <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Ex: Choc avant, TOL, MEC..."
                      {...register(`chocs.${chocIndex}.nomChoc`, {
                        required: 'Le nom du choc est obligatoire'
                      })}
                      className="h-10"
                    />
                    {errors.chocs?.[chocIndex]?.nomChoc && (
                      <p className="text-sm text-red-600">
                        {errors.chocs[chocIndex].nomChoc.message as string}
                      </p>
                    )}
                  </div>

                  {/* Temps de réparation */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Temps MO (heures) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Ex: 5.5"
                      {...register(`chocs.${chocIndex}.tempsReparation`, {
                        required: 'Le temps est obligatoire',
                        min: { value: 0, message: 'Doit être positif' }
                      })}
                      className="h-10"
                    />
                    {errors.chocs?.[chocIndex]?.tempsReparation && (
                      <p className="text-sm text-red-600">
                        {errors.chocs[chocIndex].tempsReparation.message as string}
                      </p>
                    )}
                  </div>

                  {/* Montant peinture */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Montant peinture (CFA)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ex: 150000"
                      {...register(`chocs.${chocIndex}.montantPeinture`, {
                        min: { value: 0, message: 'Doit être positif' }
                      })}
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Description détaillée <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    placeholder="Décrivez les dégâts constatés (pare-choc enfoncé, aile rayée, etc.)"
                    rows={3}
                    {...register(`chocs.${chocIndex}.description`, {
                      required: 'La description est obligatoire',
                      minLength: { value: 10, message: 'Minimum 10 caractères' }
                    })}
                    className="resize-none"
                  />
                  {errors.chocs?.[chocIndex]?.description && (
                    <p className="text-sm text-red-600">
                      {errors.chocs[chocIndex].description.message as string}
                    </p>
                  )}
                </div>

                {/* FOURNITURES */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Pièces / Fournitures</h4>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentFournitures = field.fournitures || [];
                        const newValue = ajouterFourniture(chocIndex, currentFournitures);
                        // Update via setValue
                      }}
                      className="text-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter une pièce
                    </Button>
                  </div>

                  {/* Liste des fournitures */}
                  {field.fournitures && field.fournitures.length > 0 ? (
                    <div className="space-y-3">
                      {field.fournitures.map((fourniture: any, fournitureIndex: number) => (
                        <div key={fournitureIndex} className="grid grid-cols-12 gap-3 p-3 bg-gray-50 rounded-lg border">
                          {/* Désignation */}
                          <div className="col-span-4">
                            <Input
                              placeholder="Désignation"
                              {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.designation`)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Référence */}
                          <div className="col-span-2">
                            <Input
                              placeholder="Référence"
                              {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.reference`)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Quantité */}
                          <div className="col-span-2">
                            <Input
                              type="number"
                              placeholder="Qté"
                              min="1"
                              {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.quantite`)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Prix unitaire */}
                          <div className="col-span-3">
                            <Input
                              type="number"
                              placeholder="Prix unitaire"
                              {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.prixUnitaire`)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Bouton supprimer */}
                          <div className="col-span-1 flex items-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Supprimer la fourniture
                              }}
                              className="h-9 w-9 p-0 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm bg-gray-50 rounded-lg border-2 border-dashed">
                      Aucune pièce ajoutée. Cliquez sur "Ajouter une pièce" pour commencer.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Bouton ajouter un choc */}
      {fields.length > 0 && (
        <div className="flex justify-center">
          <Button type="button" onClick={ajouterChoc} variant="outline" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un autre choc
          </Button>
        </div>
      )}

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">Comment remplir ?</p>
              <ul className="space-y-1">
                <li>• <strong>Nom du choc :</strong> Zone endommagée (ex: "Choc avant", "Tôlerie")</li>
                <li>• <strong>Temps MO :</strong> Heures de main d'œuvre nécessaires</li>
                <li>• <strong>Peinture :</strong> Coût de la peinture si nécessaire</li>
                <li>• <strong>Fournitures :</strong> Liste des pièces à remplacer avec prix</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
