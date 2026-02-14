import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Etape4Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  chocsArray: UseFieldArrayReturn<any, 'chocs', 'id'>;
}

export const Etape4Chocs = ({ register, errors, chocsArray }: Etape4Props) => {
  const { fields, append, remove } = chocsArray;

  const ajouterChoc = () => {
    append({
      nomChoc: '',
      description: '',
      tempsReparation: 0,
      montantPeinture: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-orange-900 mb-1">Chocs et dégâts constatés</h3>
          <p className="text-sm text-orange-700">
            Décrivez chaque zone endommagée (choc) séparément. 
            Vous pouvez ajouter autant de chocs que nécessaire.
          </p>
        </div>
      </div>

      {/* Liste des chocs */}
      <div className="space-y-4">
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
          fields.map((field, index) => (
            <Card key={field.id} className="border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg">Choc #{index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nom du choc */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Nom du choc <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Ex: 1er degré, Choc avant, TOL..."
                      {...register(`chocs.${index}.nomChoc`, {
                        required: 'Le nom du choc est obligatoire'
                      })}
                      className="h-11"
                    />
                    {errors.chocs?.[index]?.nomChoc && (
                      <p className="text-sm text-red-600">
                        {errors.chocs[index].nomChoc.message as string}
                      </p>
                    )}
                  </div>

                  {/* Temps de réparation */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      Temps de réparation (heures) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Ex: 5.5"
                      {...register(`chocs.${index}.tempsReparation`, {
                        required: 'Le temps de réparation est obligatoire',
                        min: { value: 0, message: 'Doit être positif' }
                      })}
                      className="h-11"
                    />
                    {errors.chocs?.[index]?.tempsReparation && (
                      <p className="text-sm text-red-600">
                        {errors.chocs[index].tempsReparation.message as string}
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
                      {...register(`chocs.${index}.montantPeinture`, {
                        min: { value: 0, message: 'Doit être positif' }
                      })}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">Mettre 0 si pas de peinture</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-semibold">
                      Description détaillée <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      placeholder="Décrivez les dégâts constatés (pare-choc enfoncé, aile rayée, etc.)"
                      rows={3}
                      {...register(`chocs.${index}.description`, {
                        required: 'La description est obligatoire',
                        minLength: { value: 10, message: 'Minimum 10 caractères' }
                      })}
                      className="resize-none"
                    />
                    {errors.chocs?.[index]?.description && (
                      <p className="text-sm text-red-600">
                        {errors.chocs[index].description.message as string}
                      </p>
                    )}
                  </div>
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
              <p className="font-semibold mb-1">Astuce</p>
              <p>
                Pour une expertise complète, ajoutez un choc pour chaque zone endommagée.
                La liste des fournitures (pièces) sera ajoutée ultérieurement via l'interface de gestion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
