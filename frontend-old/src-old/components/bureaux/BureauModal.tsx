import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bureau, BureauFormData } from '@/types/bureau';
import { BureauForm } from './BureauForm';
import { useCreateBureau, useUpdateBureau } from '@/hooks/useBureaux';

interface BureauModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bureau?: Bureau;
}

export const BureauModal = ({ open, onOpenChange, bureau }: BureauModalProps) => {
  const createBureau = useCreateBureau();
  const updateBureau = useUpdateBureau();

  const handleSubmit = async (data: BureauFormData) => {
    try {
      if (bureau) {
        await updateBureau.mutateAsync({ id: bureau.id, data });
      } else {
        await createBureau.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (error) {
      // L'erreur est gérée par le hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {bureau ? 'Modifier le bureau' : 'Nouveau bureau'}
          </DialogTitle>
          <DialogDescription>
            {bureau
              ? 'Modifiez les informations de la compagnie d\'assurance'
              : 'Ajoutez une nouvelle compagnie d\'assurance'}
          </DialogDescription>
        </DialogHeader>

        <BureauForm
          bureau={bureau}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createBureau.isPending || updateBureau.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
