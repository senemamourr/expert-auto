import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Hash, Calendar, Gauge } from 'lucide-react';
import { GenreVehicule } from '@/types/rapport';

interface Etape2Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const Etape2Vehicule = ({ register, errors }: Etape2Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Car className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-green-900 mb-1">Caractéristiques du véhicule</h3>
          <p className="text-sm text-green-700">
            Renseignez toutes les informations concernant le véhicule expertisé.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marque */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.marque" className="text-sm font-semibold text-gray-700">
                Marque <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.marque"
                placeholder="Ex: Toyota, Peugeot, Mercedes..."
                {...register('vehicule.marque', {
                  required: 'La marque est obligatoire',
                  minLength: { value: 2, message: 'Minimum 2 caractères' }
                })}
                className="h-11"
              />
              {errors.vehicule?.marque && (
                <p className="text-sm text-red-600">{errors.vehicule.marque.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Type / Modèle */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.type" className="text-sm font-semibold text-gray-700">
                Type / Modèle <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.type"
                placeholder="Ex: Corolla, 308, Classe C..."
                {...register('vehicule.type', {
                  required: 'Le type est obligatoire',
                  minLength: { value: 2, message: 'Minimum 2 caractères' }
                })}
                className="h-11"
              />
              {errors.vehicule?.type && (
                <p className="text-sm text-red-600">{errors.vehicule.type.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Genre */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.genre" className="text-sm font-semibold text-gray-700">
                Genre <span className="text-red-500">*</span>
              </Label>
              <select
                id="vehicule.genre"
                {...register('vehicule.genre', { required: 'Le genre est obligatoire' })}
                className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value={GenreVehicule.VP}>VP - Véhicule Particulier</option>
                <option value={GenreVehicule.VU}>VU - Véhicule Utilitaire</option>
                <option value={GenreVehicule.CAMION}>Camion</option>
                <option value={GenreVehicule.MOTO}>Moto</option>
                <option value={GenreVehicule.AUTRE}>Autre</option>
              </select>
              {errors.vehicule?.genre && (
                <p className="text-sm text-red-600">{errors.vehicule.genre.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Immatriculation */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <Label htmlFor="vehicule.immatriculation" className="text-sm font-semibold text-gray-700">
                  Immatriculation <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="vehicule.immatriculation"
                placeholder="Ex: DK-1234-AB"
                {...register('vehicule.immatriculation', {
                  required: "L'immatriculation est obligatoire"
                })}
                className="h-11 font-mono uppercase"
              />
              {errors.vehicule?.immatriculation && (
                <p className="text-sm text-red-600">{errors.vehicule.immatriculation.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* N° Chassis */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.numeroChasis" className="text-sm font-semibold text-gray-700">
                N° de Chassis (VIN) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.numeroChasis"
                placeholder="Ex: WBADT43452G123456 (17 caractères)"
                maxLength={17}
                {...register('vehicule.numeroChasis', {
                  required: 'Le numéro de chassis est obligatoire',
                  minLength: { value: 17, message: 'Le VIN doit contenir 17 caractères' },
                  maxLength: { value: 17, message: 'Le VIN doit contenir 17 caractères' }
                })}
                className="h-11 font-mono uppercase"
              />
              {errors.vehicule?.numeroChasis && (
                <p className="text-sm text-red-600">{errors.vehicule.numeroChasis.message as string}</p>
              )}
              <p className="text-xs text-gray-500">Le numéro de chassis doit contenir exactement 17 caractères</p>
            </div>
          </CardContent>
        </Card>

        {/* Kilométrage */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-gray-500" />
                <Label htmlFor="vehicule.kilometrage" className="text-sm font-semibold text-gray-700">
                  Kilométrage <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="vehicule.kilometrage"
                type="number"
                placeholder="Ex: 50000"
                {...register('vehicule.kilometrage', {
                  required: 'Le kilométrage est obligatoire',
                  min: { value: 0, message: 'Le kilométrage doit être positif' }
                })}
                className="h-11"
              />
              {errors.vehicule?.kilometrage && (
                <p className="text-sm text-red-600">{errors.vehicule.kilometrage.message as string}</p>
              )}
              <p className="text-xs text-gray-500">Kilométrage actuel du véhicule en km</p>
            </div>
          </CardContent>
        </Card>

        {/* Date 1ère mise en circulation */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Label htmlFor="vehicule.dateMiseCirculation" className="text-sm font-semibold text-gray-700">
                  Date 1ère Mise en Circulation <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="vehicule.dateMiseCirculation"
                type="date"
                {...register('vehicule.dateMiseCirculation', {
                  required: 'La date de mise en circulation est obligatoire'
                })}
                className="h-11"
              />
              {errors.vehicule?.dateMiseCirculation && (
                <p className="text-sm text-red-600">{errors.vehicule.dateMiseCirculation.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Couleur */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.couleur" className="text-sm font-semibold text-gray-700">
                Couleur <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.couleur"
                placeholder="Ex: Blanc, Noir, Bleu..."
                {...register('vehicule.couleur', {
                  required: 'La couleur est obligatoire'
                })}
                className="h-11"
              />
              {errors.vehicule?.couleur && (
                <p className="text-sm text-red-600">{errors.vehicule.couleur.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Source d'énergie */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.sourceEnergie" className="text-sm font-semibold text-gray-700">
                Source d'énergie <span className="text-red-500">*</span>
              </Label>
              <select
                id="vehicule.sourceEnergie"
                {...register('vehicule.sourceEnergie', { required: "La source d'énergie est obligatoire" })}
                className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Électrique">Électrique</option>
                <option value="Hybride">Hybride</option>
                <option value="GPL">GPL</option>
              </select>
              {errors.vehicule?.sourceEnergie && (
                <p className="text-sm text-red-600">{errors.vehicule.sourceEnergie.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Puissance fiscale */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.puissanceFiscale" className="text-sm font-semibold text-gray-700">
                Puissance Fiscale (CV) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.puissanceFiscale"
                type="number"
                placeholder="Ex: 7"
                {...register('vehicule.puissanceFiscale', {
                  required: 'La puissance fiscale est obligatoire',
                  min: { value: 1, message: 'Minimum 1 CV' }
                })}
                className="h-11"
              />
              {errors.vehicule?.puissanceFiscale && (
                <p className="text-sm text-red-600">{errors.vehicule.puissanceFiscale.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Valeur à neuf */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="vehicule.valeurNeuve" className="text-sm font-semibold text-gray-700">
                Valeur à Neuf (CFA) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicule.valeurNeuve"
                type="number"
                placeholder="Ex: 15000000"
                {...register('vehicule.valeurNeuve', {
                  required: 'La valeur à neuf est obligatoire',
                  min: { value: 0, message: 'La valeur doit être positive' }
                })}
                className="h-11"
              />
              {errors.vehicule?.valeurNeuve && (
                <p className="text-sm text-red-600">{errors.vehicule.valeurNeuve.message as string}</p>
              )}
              <p className="text-xs text-gray-500">Prix du véhicule neuf en Francs CFA</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
