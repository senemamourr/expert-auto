import { useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showHomeButton?: boolean;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, showHomeButton = true, actions }: PageHeaderProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showHomeButton && (
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-blue-500 hover:text-white gap-2 px-4"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Accueil</span>
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-blue-100 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {actions}
            <div className="hidden md:flex items-center gap-4 border-l border-blue-500 pl-4 ml-4">
              <div className="text-right">
                <p className="font-medium text-sm">{user.prenom} {user.nom}</p>
                <p className="text-xs text-blue-100">{user.role || 'Expert'}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-red-500 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
