import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Building2, LogOut, Plus, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Expertise Auto</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user.prenom} {user.nom}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tableau de bord</h2>
          <p className="text-gray-600 mt-1">Bienvenue {user.prenom}, gérez vos rapports d'expertise</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rapports totaux</CardDescription>
              <CardTitle className="text-4xl">0</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>En cours</CardDescription>
              <CardTitle className="text-4xl text-orange-600">0</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Terminés</CardDescription>
              <CardTitle className="text-4xl text-green-600">0</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Revenus du mois</CardDescription>
              <CardTitle className="text-4xl">0 CFA</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Actions rapides */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nouveau rapport */}
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
              onClick={() => navigate('/rapports/nouveau')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Nouveau rapport</CardTitle>
                    <CardDescription>Créer un rapport d'expertise</CardDescription>
                  </div>
                  <Plus className="w-8 h-8 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={(e) => { e.stopPropagation(); navigate('/rapports/nouveau'); }}>
                  Créer
                </Button>
              </CardContent>
            </Card>

            {/* Mes rapports */}
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
              onClick={() => navigate('/rapports')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Mes rapports</CardTitle>
                    <CardDescription>Consulter tous les rapports</CardDescription>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate('/rapports'); }}>
                  Consulter
                </Button>
              </CardContent>
            </Card>

            {/* Bureaux */}
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
              onClick={() => navigate('/bureaux')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Bureaux</CardTitle>
                    <CardDescription>Gérer les compagnies</CardDescription>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate('/bureaux'); }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section supplémentaire */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Autres fonctionnalités</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Statistiques */}
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
              onClick={() => navigate('/statistiques')}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Statistiques</CardTitle>
                    <CardDescription>Voir les graphiques et analyses</CardDescription>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardHeader>
            </Card>

            {/* Placeholder pour futures fonctionnalités */}
            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Prochainement</CardTitle>
                    <CardDescription>Nouvelles fonctionnalités à venir</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
