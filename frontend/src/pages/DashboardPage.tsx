import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Building2, LogOut, Plus } from 'lucide-react';

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
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
                <Button className="w-full">Créer</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
                <Button variant="outline" className="w-full">Consulter</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/bureaux')}>
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
                <Button variant="outline" className="w-full">Gérer</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
