import { CheckCircle, Clock, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatutRapport } from '@/types/rapport';

interface StatutActionButtonProps {
  currentStatut: StatutRapport;
  onClick: () => void;
}

export const StatutActionButton = ({ currentStatut, onClick }: StatutActionButtonProps) => {
  const getButton = () => {
    switch (currentStatut) {
      case StatutRapport.BROUILLON:
        return {
          label: 'Mettre en cours',
          icon: Clock,
          className: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
        };
      case StatutRapport.EN_COURS:
        return {
          label: 'Terminer',
          icon: CheckCircle,
          className: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
        };
      case StatutRapport.TERMINE:
        return {
          label: 'Archiver',
          icon: Archive,
          className: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
        };
      case StatutRapport.ARCHIVE:
        return null;
      default:
        return null;
    }
  };

  const button = getButton();
  
  if (!button) return null;

  const Icon = button.icon;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={button.className}
    >
      <Icon className="w-4 h-4 mr-1" />
      {button.label}
    </Button>
  );
};
