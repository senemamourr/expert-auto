import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BureauForm } from './BureauForm';
import { Bureau } from '@/types/bureau';

interface BureauModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bureau?: Bureau;
}

export const BureauModal = ({ open, onOpenChange, bureau }: BureauModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {bureau ? 'Modifier le bureau' : 'Nouveau bureau'}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            {bureau 
              ? "Modifiez les informations de la compagnie d'assurance" 
              : "Ajoutez une nouvelle compagnie d'assurance"
            }
          </p>
        </DialogHeader>
        <BureauForm bureau={bureau} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
