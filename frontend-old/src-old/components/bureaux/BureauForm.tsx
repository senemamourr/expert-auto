import { useForm } from 'react-hook-form';
import { Bureau, BureauFormData } from '@/types/bureau';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BureauFormProps {
  bureau?: Bureau;
  onSubmit: (data: BureauFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const BureauForm = ({ bureau, onSubmit, onCancel, isLoading }: BureauFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BureauFormData>({
    defaultValues: bureau
      ? {
          code: bureau.code,
          nomAgence: bureau.nomAgence,
          responsableSinistres: bureau.responsableSinistres,
          telephone: bureau.telephone,
          email: bureau.email,
          adresse: bureau.adresse,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Code Bureau */}
      <div className="space-y-2">
        <Label htmlFor="code">Code Bureau *</Label>
        <Input
          id="code"
          {...register('code', { 
            required: 'Le code bureau est requis',
            maxLength: { value: 20, message: 'Maximum 20 caractères' }
          })}
          placeholder="Ex: AXA001"
          disabled={!!bureau || isLoading}
        />
        {errors.code && (
          <p className="text-sm text-red-500">{errors.code.message}</p>
        )}
      </div>

      {/* Nom de l'agence */}
      <div className="space-y-2">
        <Label htmlFor="nomAgence">Nom de l'agence *</Label>
        <Input
          id="nomAgence"
          {...register('nomAgence', { 
            required: 'Le nom de l\'agence est requis',
            maxLength: { value: 255, message: 'Maximum 255 caractères' }
          })}
          placeholder="Ex: AXA Assurances Dakar"
          disabled={isLoading}
        />
        {errors.nomAgence && (
          <p className="text-sm text-red-500">{errors.nomAgence.message}</p>
        )}
      </div>

      {/* Responsable sinistres */}
      <div className="space-y-2">
        <Label htmlFor="responsableSinistres">Responsable Sinistres *</Label>
        <Input
          id="responsableSinistres"
          {...register('responsableSinistres', { 
            required: 'Le responsable est requis',
            maxLength: { value: 255, message: 'Maximum 255 caractères' }
          })}
          placeholder="Ex: Amadou Diop"
          disabled={isLoading}
        />
        {errors.responsableSinistres && (
          <p className="text-sm text-red-500">{errors.responsableSinistres.message}</p>
        )}
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <Label htmlFor="telephone">Téléphone *</Label>
        <Input
          id="telephone"
          type="tel"
          {...register('telephone', { 
            required: 'Le téléphone est requis',
            pattern: {
              value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
              message: 'Numéro de téléphone invalide'
            }
          })}
          placeholder="Ex: +221 77 123 45 67"
          disabled={isLoading}
        />
        {errors.telephone && (
          <p className="text-sm text-red-500">{errors.telephone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'L\'email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          })}
          placeholder="Ex: sinistres@axa.sn"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Adresse */}
      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse *</Label>
        <Textarea
          id="adresse"
          {...register('adresse', { 
            required: 'L\'adresse est requise',
            maxLength: { value: 500, message: 'Maximum 500 caractères' }
          })}
          placeholder="Ex: Avenue Léopold Sédar Senghor, Immeuble ABC, Dakar"
          rows={3}
          disabled={isLoading}
        />
        {errors.adresse && (
          <p className="text-sm text-red-500">{errors.adresse.message}</p>
        )}
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Enregistrement...' : bureau ? 'Modifier' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};
