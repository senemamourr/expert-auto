import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { Stepper } from '@/components/rapports/Stepper';
import { toast } from 'sonner';

const steps = [
  {
    id: 1,
    title: 'Informations',
    description: 'Données générales',
  },
  {
    id: 2,
    title: 'Véhicule',
    description: 'Caractéristiques',
  },
  {
    id: 3,
    title: 'Assuré',
    description: 'Propriétaire',
  },
  {
    id: 4,
    title: 'Chocs',
    description: 'Dégâts constatés',
  },
  {
    id: 5,
    title: 'Récapitulatif',
    description: 'Validation',
  },
];

export const NouveauRapportPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    toast.success('Brouillon sauvegardé');
  };

  const handleSubmit = () => {
    toast.success('Rapport créé avec succès');
    navigate('/rapports');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <PageHeader
        title="Nouveau Rapport d'Expertise"
        subtitle="Création d'un rapport étape par étape"
        showHomeButton={false}
        actions={
          <Button
            variant="outline"
            onClick={() => navigate('/rapports')}
            className="bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        }
      />

      <main className="container mx-auto px-6 py-8">
        {/* Stepper */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-6">
            <Stepper steps={steps} currentStep={currentStep} />
          </CardContent>
        </Card>

        {/* Contenu de l'étape */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Contenu dynamique selon l'étape */}
            <div className="min-h-[400px]">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">📋 Étape 1 : Informations générales</h3>
                  <p className="text-gray-600">
                    Formulaire de l'étape 1 à venir...
                  </p>
                  {/* Formulaire Étape 1 sera ajouté ici */}
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">🚗 Étape 2 : Véhicule</h3>
                  <p className="text-gray-600">
                    Formulaire de l'étape 2 à venir...
                  </p>
                  {/* Formulaire Étape 2 sera ajouté ici */}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">👤 Étape 3 : Assuré</h3>
                  <p className="text-gray-600">
                    Formulaire de l'étape 3 à venir...
                  </p>
                  {/* Formulaire Étape 3 sera ajouté ici */}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">💥 Étape 4 : Chocs et dégâts</h3>
                  <p className="text-gray-600">
                    Formulaire de l'étape 4 à venir...
                  </p>
                  {/* Formulaire Étape 4 sera ajouté ici */}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">✅ Étape 5 : Récapitulatif</h3>
                  <p className="text-gray-600">
                    Récapitulatif et validation à venir...
                  </p>
                  {/* Récapitulatif Étape 5 sera ajouté ici */}
                </div>
              )}
            </div>

            {/* Boutons de navigation */}
            <div className="flex items-center justify-between pt-8 border-t mt-8">
              <div>
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Précédent
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Sauvegarder brouillon
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 gap-2"
                  >
                    Créer le rapport
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
