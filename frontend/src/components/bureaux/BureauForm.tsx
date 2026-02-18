import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBureau, useUpdateBureau } from '@/hooks/useBureaux';
import { Bureau, BureauFormData } from '@/types/bureau';

interface BureauFormProps {
  bureau?: Bureau;
  onSuccess?: () => void;
}

export const BureauForm = ({ bureau, onSuccess }: BureauFormProps) => {
  const createBureau = useCreateBureau();
  const updateBureau = useUpdateBureau();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BureauFormData>({
    defaultValues: bureau ? {
      code: bureau.code,
      nomAgence: bureau.nomAgence,
      responsableSinistres: bureau.responsableSinistres,
      telephone: bureau.telephone,
      email: bureau.email,
      adresse: bureau.adresse,
    } : undefined,
  });

  const onSubmit = async (data: BureauFormData) => {
    try {
      if (bureau) {
        await updateBureau.mutateAsync({ id: bureau.id, data });
      } else {
        await createBureau.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code Bureau */}
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium text-gray-700">
            Code Bureau <span className="text-red-500">*</span>
          </Label>
          <Input
            id="code"
            placeholder="Ex: AXA001"
            {...register('code', { 
              required: 'Le code est obligatoire',
              minLength: { value: 2, message: 'Minimum 2 caractères' }
            })}
            className="bg-white border-gray-300"
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>

        {/* Nom de l'agence */}
        <div className="space-y-2">
          <Label htmlFor="nomAgence" className="text-sm font-medium text-gray-700">
            Nom de l'agence <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nomAgence"
            placeholder="Ex: AXA Assurances Dakar"
            {...register('nomAgence', { 
              required: "Le nom de l'agence est obligatoire",
              minLength: { value: 3, message: 'Minimum 3 caractères' }
            })}
            className="bg-white border-gray-300"
          />
          {errors.nomAgence && (
            <p className="text-sm text-red-500">{errors.nomAgence.message}</p>
          )}
        </div>
      </div>

      {/* Responsable Sinistres */}
      <div className="space-y-2">
        <Label htmlFor="responsableSinistres" className="text-sm font-medium text-gray-700">
          Responsable Sinistres <span className="text-red-500">*</span>
        </Label>
        <Input
          id="responsableSinistres"
          placeholder="Ex: Amadou Diop"
          {...register('responsableSinistres', { 
            required: 'Le responsable est obligatoire',
            minLength: { value: 3, message: 'Minimum 3 caractères' }
          })}
          className="bg-white border-gray-300"
        />
        {errors.responsableSinistres && (
          <p className="text-sm text-red-500">{errors.responsableSinistres.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-sm font-medium text-gray-700">
            Téléphone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="telephone"
            type="tel"
            placeholder="Ex: +221 77 123 45 67"
            {...register('telephone', { 
              required: 'Le téléphone est obligatoire',
              pattern: {
                value: /^[+\d\s()-]+$/,
                message: 'Format de téléphone invalide'
              }
            })}
            className="bg-white border-gray-300"
          />
          {errors.telephone && (
            <p className="text-sm text-red-500">{errors.telephone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Ex: sinistres@axa.sn"
            {...register('email', { 
              required: "L'email est obligatoire",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide'
              }
            })}
            className="bg-white border-gray-300"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Adresse */}
      <div className="space-y-2">
        <Label htmlFor="adresse" className="text-sm font-medium text-gray-700">
          Adresse <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="adresse"
          placeholder="Ex: Avenue Léopold Sédar Senghor, Dakar"
          rows={3}
          {...register('adresse', { 
            required: "L'adresse est obligatoire",
            minLength: { value: 10, message: 'Minimum 10 caractères' }
          })}
          className="bg-white border-gray-300 resize-none"
        />
        {errors.adresse && (
          <p className="text-sm text-red-500">{errors.adresse.message}</p>
        )}
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isSubmitting}
          className="px-6"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              {bureau ? 'Modification...' : 'Création...'}
            </span>
          ) : (
            bureau ? 'Enregistrer' : 'Créer le bureau'
          )}
        </Button>
      </div>
    </form>
  );
};
