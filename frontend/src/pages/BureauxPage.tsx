// Version simplifiée de BureauxPage pour tester
// Si celle-ci fonctionne, on pourra ajouter les fonctionnalités après

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const BureauxPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              ← Retour
            </Button>
            <h1 className="text-2xl font-bold text-blue-900">Bureaux</h1>
          </div>
          <Button onClick={() => alert('Fonctionnalité à venir')}>
            + Nouveau bureau
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Liste des bureaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                ✅ La page Bureaux fonctionne !
              </p>
              <p className="text-sm text-gray-400">
                Si vous voyez ce message, la navigation est réparée.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/dashboard')}
              >
                Retour au Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Export par défaut aussi pour compatibilité
export default BureauxPage;
