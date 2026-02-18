import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, FileText, Building2 } from 'lucide-react';
import { TypeRapport } from '@/types/rapport';
import { useBureaux } from '@/hooks/useBureaux';

interface Etape1Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const Etape1InfosGenerales = ({ register, errors }: Etape1Props) => {
  const { data: bureaux } = useBureaux();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">Informations générales du rapport</h3>
          <p className="text-sm text-blue-700">
            Renseignez les informations de base du rapport d'expertise.
            Ces informations identifient le sinistre et le type d'expertise à réaliser.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Type de rapport */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="typeRapport" className="text-sm font-semibold text-gray-700">
                Type de rapport <span className="text-red-500">*</span>
              </Label>
              <select
                id="typeRapport"
                {...register('typeRapport', { required: 'Le type de rapport est obligatoire' })}
                className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez un type</option>
                <option value={TypeRapport.ESTIMATIF_REPARATION}>Estimatif de réparation</option>
                <option value={TypeRapport.VALEUR_VENALE}>Valeur vénale</option>
                <option value={TypeRapport.TIERCE_EXPERTISE}>Tierce expertise</option>
              </select>
              {errors.typeRapport && (
                <p className="text-sm text-red-600">{errors.typeRapport.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* N° Ordre de service */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="numeroOrdreService" className="text-sm font-semibold text-gray-700">
                N° Ordre de Service <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numeroOrdreService"
                placeholder="Ex: OS-2024-001"
                {...register('numeroOrdreService', {
                  required: "Le numéro d'ordre de service est obligatoire",
                  minLength: { value: 3, message: 'Minimum 3 caractères' }
                })}
                className="h-11"
              />
              {errors.numeroOrdreService && (
                <p className="text-sm text-red-600">{errors.numeroOrdreService.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bureau / Compagnie */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <Label htmlFor="bureauId" className="text-sm font-semibold text-gray-700">
                Compagnie d'assurance <span className="text-red-500">*</span>
              </Label>
            </div>
            <select
              id="bureauId"
              {...register('bureauId', { required: 'La compagnie est obligatoire' })}
              className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez une compagnie</option>
              {bureaux?.map((bureau) => (
                <option key={bureau.id} value={bureau.id}>
                  {bureau.code} - {bureau.nomAgence}
                </option>
              ))}
            </select>
            {errors.bureauId && (
              <p className="text-sm text-red-600">{errors.bureauId.message as string}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Si la compagnie n'existe pas, créez-la d'abord dans le module Bureaux
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* N° Sinistre */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="numeroSinistre" className="text-sm font-semibold text-gray-700">
                N° de Sinistre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numeroSinistre"
                placeholder="Ex: SIN-2024-12345"
                {...register('numeroSinistre', {
                  required: 'Le numéro de sinistre est obligatoire',
                  minLength: { value: 3, message: 'Minimum 3 caractères' }
                })}
                className="h-11"
              />
              {errors.numeroSinistre && (
                <p className="text-sm text-red-600">{errors.numeroSinistre.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Date du sinistre */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Label htmlFor="dateSinistre" className="text-sm font-semibold text-gray-700">
                  Date du Sinistre <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="dateSinistre"
                type="date"
                {...register('dateSinistre', {
                  required: 'La date du sinistre est obligatoire'
                })}
                className="h-11"
              />
              {errors.dateSinistre && (
                <p className="text-sm text-red-600">{errors.dateSinistre.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Date de visite */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Label htmlFor="dateVisite" className="text-sm font-semibold text-gray-700">
                  Date de Visite / Expertise <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="dateVisite"
                type="date"
                {...register('dateVisite', {
                  required: 'La date de visite est obligatoire'
                })}
                className="h-11"
              />
              {errors.dateVisite && (
                <p className="text-sm text-red-600">{errors.dateVisite.message as string}</p>
              )}
              <p className="text-xs text-gray-500">
                La date de visite doit être postérieure à la date du sinistre
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
