import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { Stepper } from '@/components/rapports/Stepper';
import { Etape1InfosGenerales } from '@/components/rapports/Etape1InfosGenerales';
import { Etape2Vehicule } from '@/components/rapports/Etape2Vehicule';
import { Etape3Assure } from '@/components/rapports/Etape3Assure';
import { Etape4Chocs } from '@/components/rapports/Etape4Chocs';
import { Etape5Recapitulatif } from '@/components/rapports/Etape5Recapitulatif';
import { useCreateRapport } from '@/hooks/useRapports';
import { toast } from 'sonner';
import { StatutRapport } from '@/types/rapport';

const steps = [
  { id: 1, title: 'Informations', description: 'Données générales' },
  { id: 2, title: 'Véhicule', description: 'Caractéristiques' },
  { id: 3, title: 'Assuré', description: 'Propriétaire' },
  { id: 4, title: 'Chocs', description: 'Dégâts constatés' },
  { id: 5, title: 'Récapitulatif', description: 'Validation' },
];

export const NouveauRapportPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const createRapport = useCreateRapport();

  const { register, handleSubmit, formState: { errors }, watch, control } = useForm({
    defaultValues: {
      typeRapport: '',
      numeroOrdreService: '',
      bureauId: '',
      numeroSinistre: '',
      dateSinistre: '',
      dateVisite: '',
      vehicule: {
        marque: '',
        type: '',
        genre: '',
        immatriculation: '',
        numeroChasis: '',
        kilometrage: '',
        dateMiseCirculation: '',
        couleur: '',
        sourceEnergie: '',
        puissanceFiscale: '',
        valeurNeuve: '',
      },
      assure: {
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        adresse: '',
      },
      chocs: [
        {
          nomChoc: '',
          description: '',
          tempsReparation: 0,
          montantPeinture: 0,
        }
      ],
    },
  });

  const chocsArray = useFieldArray({
    control,
    name: 'chocs',
  });

  const formData = watch();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const validateCurrentStep = () => {
    const step = currentStep;
    
    if (step === 0) {
      // Validation étape 1
      const { typeRapport, numeroOrdreService, bureauId, numeroSinistre, dateSinistre, dateVisite } = formData;
      if (!typeRapport || !numeroOrdreService || !bureauId || !numeroSinistre || !dateSinistre || !dateVisite) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return false;
      }
    }
    
    if (step === 1) {
      // Validation étape 2
      const v = formData.vehicule;
      if (!v.marque || !v.type || !v.genre || !v.immatriculation || !v.numeroChasis || 
          !v.kilometrage || !v.dateMiseCirculation || !v.couleur || !v.sourceEnergie || 
          !v.puissanceFiscale || !v.valeurNeuve) {
        toast.error('Veuillez remplir tous les champs du véhicule');
        return false;
      }
      if (v.numeroChasis.length !== 17) {
        toast.error('Le numéro de chassis doit contenir 17 caractères');
        return false;
      }
    }
    
    if (step === 2) {
      // Validation étape 3
      const a = formData.assure;
      if (!a.nom || !a.prenom || !a.telephone || !a.adresse) {
        toast.error('Veuillez remplir tous les champs de l\'assuré');
        return false;
      }
    }
    
    if (step === 3) {
      // Validation étape 4
      if (!formData.chocs || formData.chocs.length === 0) {
        toast.error('Veuillez ajouter au moins un choc');
        return false;
      }
      const invalidChoc = formData.chocs.find(c => !c.nomChoc || !c.description || c.tempsReparation <= 0);
      if (invalidChoc) {
        toast.error('Veuillez remplir tous les champs de chaque choc');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = async () => {
    try {
      const data = {
        ...formData,
        statut: StatutRapport.BROUILLON,
        montantTotal: 0, // Sera calculé plus tard
      };
      await createRapport.mutateAsync(data);
      toast.success('Brouillon sauvegardé avec succès');
      navigate('/rapports');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du brouillon');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const rapportData = {
        ...data,
        statut: StatutRapport.BROUILLON,
        montantTotal: 0, // Sera calculé automatiquement par le backend
      };
      
      await createRapport.mutateAsync(rapportData);
      toast.success('Rapport créé avec succès !');
      navigate('/rapports');
    } catch (error) {
      toast.error('Erreur lors de la création du rapport');
      console.error(error);
    }
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

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {currentStep === 0 && <Etape1InfosGenerales register={register} errors={errors} />}
                {currentStep === 1 && <Etape2Vehicule register={register} errors={errors} />}
                {currentStep === 2 && <Etape3Assure register={register} errors={errors} />}
                {currentStep === 3 && <Etape4Chocs register={register} errors={errors} chocsArray={chocsArray} />}
                {currentStep === 4 && <Etape5Recapitulatif formData={formData} />}
              </div>

              {/* Boutons de navigation */}
              <div className="flex items-center justify-between pt-8 border-t mt-8">
                <div>
                  {!isFirstStep && (
                    <Button
                      type="button"
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
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={createRapport.isPending}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sauvegarder brouillon
                  </Button>

                  {isLastStep ? (
                    <Button
                      type="submit"
                      disabled={createRapport.isPending}
                      className="bg-green-600 hover:bg-green-700 gap-2"
                    >
                      {createRapport.isPending ? 'Création...' : 'Créer le rapport'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
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
        </form>
      </main>
    </div>
  );
};
