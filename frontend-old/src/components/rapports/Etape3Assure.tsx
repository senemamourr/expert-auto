import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { User, Phone, Mail, MapPin } from 'lucide-react';

interface Etape3Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const Etape3Assure = ({ register, errors }: Etape3Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <User className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-purple-900 mb-1">Informations sur l'assuré</h3>
          <p className="text-sm text-purple-700">
            Coordonnées du propriétaire du véhicule ou de l'assuré.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="assure.nom" className="text-sm font-semibold text-gray-700">
                Nom <span className="text-red-500">*</span>
              </Label>
              <Input
                id="assure.nom"
                placeholder="Ex: DIOP"
                {...register('assure.nom', {
                  required: 'Le nom est obligatoire',
                  minLength: { value: 2, message: 'Minimum 2 caractères' }
                })}
                className="h-11 uppercase"
              />
              {errors.assure?.nom && (
                <p className="text-sm text-red-600">{errors.assure.nom.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Prénom */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="assure.prenom" className="text-sm font-semibold text-gray-700">
                Prénom <span className="text-red-500">*</span>
              </Label>
              <Input
                id="assure.prenom"
                placeholder="Ex: Amadou"
                {...register('assure.prenom', {
                  required: 'Le prénom est obligatoire',
                  minLength: { value: 2, message: 'Minimum 2 caractères' }
                })}
                className="h-11"
              />
              {errors.assure?.prenom && (
                <p className="text-sm text-red-600">{errors.assure.prenom.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Téléphone */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <Label htmlFor="assure.telephone" className="text-sm font-semibold text-gray-700">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
              </div>
              <Input
                id="assure.telephone"
                type="tel"
                placeholder="Ex: +221 77 123 45 67"
                {...register('assure.telephone', {
                  required: 'Le téléphone est obligatoire',
                  pattern: {
                    value: /^[+\d\s()-]+$/,
                    message: 'Format de téléphone invalide'
                  }
                })}
                className="h-11"
              />
              {errors.assure?.telephone && (
                <p className="text-sm text-red-600">{errors.assure.telephone.message as string}</p>
              )}
              <p className="text-xs text-gray-500">
                Pour faciliter le contact pour une seconde visite ou un contrôle
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email (optionnel) */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Label htmlFor="assure.email" className="text-sm font-semibold text-gray-700">
                  Email <span className="text-gray-400 text-xs">(optionnel)</span>
                </Label>
              </div>
              <Input
                id="assure.email"
                type="email"
                placeholder="Ex: assure@email.com"
                {...register('assure.email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email invalide'
                  }
                })}
                className="h-11"
              />
              {errors.assure?.email && (
                <p className="text-sm text-red-600">{errors.assure.email.message as string}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Adresse */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <Label htmlFor="assure.adresse" className="text-sm font-semibold text-gray-700">
                  Adresse Complète <span className="text-red-500">*</span>
                </Label>
              </div>
              <Textarea
                id="assure.adresse"
                placeholder="Ex: Cité Keur Gorgui, Lot 45, Dakar"
                rows={4}
                {...register('assure.adresse', {
                  required: "L'adresse est obligatoire",
                  minLength: { value: 10, message: 'Minimum 10 caractères' }
                })}
                className="resize-none"
              />
              {errors.assure?.adresse && (
                <p className="text-sm text-red-600">{errors.assure.adresse.message as string}</p>
              )}
              <p className="text-xs text-gray-500">
                Adresse complète : quartier, lot/parcelle, ville
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Résumé visuel */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-purple-900 mb-2">À quoi servent ces informations ?</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Identifier le propriétaire du véhicule</li>
                <li>• Faciliter le contact pour une seconde visite si nécessaire</li>
                <li>• Permettre un contrôle de réparation</li>
                <li>• Valider l'identité lors de la remise du rapport</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
