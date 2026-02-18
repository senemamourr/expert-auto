import { useState } from 'react';
import { CheckCircle, Clock, Archive, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StatutRapport } from '@/types/rapport';

interface StatutChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatut: StatutRapport;
  onConfirm: (commentaire?: string) => void;
  isLoading?: boolean;
}

const statutFlow: Record<StatutRapport, { next: StatutRapport | null; label: string; icon: any; color: string }> = {
  [StatutRapport.BROUILLON]: {
    next: StatutRapport.EN_COURS,
    label: 'Mettre en cours',
    icon: Clock,
    color: 'orange',
  },
  [StatutRapport.EN_COURS]: {
    next: StatutRapport.TERMINE,
    label: 'Marquer comme terminé',
    icon: CheckCircle,
    color: 'green',
  },
  [StatutRapport.TERMINE]: {
    next: StatutRapport.ARCHIVE,
    label: 'Archiver',
    icon: Archive,
    color: 'blue',
  },
  [StatutRapport.ARCHIVE]: {
    next: null,
    label: 'Déjà archivé',
    icon: Archive,
    color: 'gray',
  },
};

export const StatutChangeDialog = ({
  open,
  onOpenChange,
  currentStatut,
  onConfirm,
  isLoading = false,
}: StatutChangeDialogProps) => {
  const [commentaire, setCommentaire] = useState('');
  const flow = statutFlow[currentStatut];
  const nextStatut = flow.next;
  
  if (!nextStatut) {
    return null;
  }

  const nextFlow = statutFlow[nextStatut];
  const Icon = nextFlow.icon;

  const handleConfirm = () => {
    onConfirm(commentaire);
    setCommentaire('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`p-2 bg-${nextFlow.color}-100 rounded-lg`}>
              <Icon className={`w-6 h-6 text-${nextFlow.color}-600`} />
            </div>
            {flow.label}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Vous êtes sur le point de changer le statut du rapport.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transition visuelle */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {currentStatut.replace('_', ' ')}
              </p>
            </div>
            
            <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-gray-300 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <span className="text-2xl">→</span>
              </div>
            </div>

            <div className="text-center">
              <div className={`w-16 h-16 bg-${nextFlow.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-8 h-8 text-${nextFlow.color}-600`} />
              </div>
              <p className={`text-sm font-medium text-${nextFlow.color}-700`}>
                {nextStatut.replace('_', ' ')}
              </p>
            </div>
          </div>

          {/* Commentaire optionnel */}
          <div className="space-y-2">
            <Label htmlFor="commentaire" className="text-sm font-medium">
              Commentaire (optionnel)
            </Label>
            <Textarea
              id="commentaire"
              placeholder="Ajoutez un commentaire pour ce changement de statut..."
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`bg-${nextFlow.color}-600 hover:bg-${nextFlow.color}-700`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Changement...
              </span>
            ) : (
              flow.label
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
