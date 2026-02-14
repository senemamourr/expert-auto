import { UseFormRegister, FieldErrors, UseFieldArrayReturn, Control, useFieldArray } from 'react-hook-form';
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
  control: Control<any>;
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

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-orange-900 mb-1">Chocs et dégâts constatés</h3>
          <p className="text-sm text-orange-700">
            Décrivez chaque zone endommagée (choc) séparément. Vous pouvez ajouter autant de chocs que nécessaire.
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
            <ChocCard
              key={field.id}
              chocIndex={chocIndex}
              field={field}
              register={register}
              errors={errors}
              control={control}
              onRemove={() => remove(chocIndex)}
              canRemove={fields.length > 1}
            />
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
                <li>• <strong>Temps réparation :</strong> Heures de main d'œuvre nécessaires</li>
                <li>• <strong>Peinture :</strong> Coût de la peinture si nécessaire</li>
                <li>• <strong>Description :</strong> Détails des dégâts constatés</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Composant pour un choc individuel
interface ChocCardProps {
  chocIndex: number;
  field: any;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  onRemove: () => void;
  canRemove: boolean;
}

function ChocCard({ chocIndex, field, register, errors, control, onRemove, canRemove }: ChocCardProps) {
  const fournituresArray = useFieldArray({
    control,
    name: `chocs.${chocIndex}.fournitures`,
  });

  const ajouterFourniture = () => {
    fournituresArray.append({
      designation: '',
      reference: '',
      quantite: 1,
      prixUnitaire: 0,
    });
  };

  // Calculer le total des fournitures
  const calculerTotalFournitures = () => {
    if (!field.fournitures || field.fournitures.length === 0) return 0;
    return field.fournitures.reduce((sum: number, f: any) => {
      const total = (f.quantite || 0) * (f.prixUnitaire || 0);
      return sum + total;
    }, 0);
  };

  const totalFournitures = calculerTotalFournitures();

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Choc #{chocIndex + 1}</CardTitle>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
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
              placeholder="Ex: 1er degré, Choc avant, TOL..."
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
              Temps de réparation (heures) <span className="text-red-500">*</span>
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
            <p className="text-xs text-gray-500">Mettre 0 si pas de peinture</p>
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

        {/* FOURNITURES / PIÈCES */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">
                Pièces / Fournitures 
                {totalFournitures > 0 && (
                  <span className="ml-2 text-sm font-normal text-green-600">
                    (Total: {totalFournitures.toLocaleString()} CFA)
                  </span>
                )}
              </h4>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={ajouterFourniture}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter une pièce
            </Button>
          </div>

          {/* Liste des fournitures */}
          {fournituresArray.fields.length > 0 ? (
            <div className="space-y-3">
              {fournituresArray.fields.map((fourniture, fournitureIndex) => (
                <FournitureRow
                  key={fourniture.id}
                  chocIndex={chocIndex}
                  fournitureIndex={fournitureIndex}
                  register={register}
                  onRemove={() => fournituresArray.remove(fournitureIndex)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-lg border-2 border-dashed">
              <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>Aucune pièce ajoutée</p>
              <p className="text-xs mt-1">Cliquez sur "Ajouter une pièce" pour commencer</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Composant pour une ligne de fourniture
interface FournitureRowProps {
  chocIndex: number;
  fournitureIndex: number;
  register: UseFormRegister<any>;
  onRemove: () => void;
}

function FournitureRow({ chocIndex, fournitureIndex, register, onRemove }: FournitureRowProps) {
  return (
    <div className="grid grid-cols-12 gap-3 p-3 bg-gray-50 rounded-lg border hover:border-blue-300 transition-colors">
      {/* Désignation */}
      <div className="col-span-4">
        <Input
          placeholder="Ex: CAPOT MOTEUR"
          {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.designation`)}
          className="h-9 text-sm"
        />
      </div>

      {/* Référence */}
      <div className="col-span-2">
        <Input
          placeholder="Réf. ou NON DISPO"
          {...register(`chocs.${chocIndex}.fournitures.${fournitureIndex}.reference`)}
          className="h-9 text-sm"
        />
      </div>

      {/* Quantité */}
      <div className="col-span-2">
        <Input
          type="number"
          min="1"
          defaultValue="1"
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
          onClick={onRemove}
          className="h-9 w-9 p-0 text-red-600 hover:bg-red-50"
          title="Supprimer cette pièce"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
