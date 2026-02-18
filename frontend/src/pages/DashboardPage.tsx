import { useNavigate } from 'react-router-dom';
import { FileText, Building2, Plus, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Expertise Automobile</h1>
              <p className="text-blue-100 text-sm mt-1">Tableau de bord</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-medium text-sm">{user.prenom} {user.nom}</p>
                <p className="text-xs text-blue-100">{user.role || 'Expert'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Bienvenue */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue {user.prenom} 👋
          </h2>
          <p className="text-gray-600">
            Gérez vos expertises automobiles efficacement
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">Rapports totaux</p>
            <p className="text-4xl font-bold text-gray-900">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-l-orange-500">
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">En cours</p>
            <p className="text-4xl font-bold text-orange-600">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">Terminés</p>
            <p className="text-4xl font-bold text-green-600">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-l-purple-500">
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">Revenus du mois</p>
            <p className="text-4xl font-bold text-gray-900">0 <span className="text-base text-gray-600">CFA</span></p>
          </div>
        </div>

        {/* Actions rapides */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Nouveau rapport */}
            <button
              onClick={() => navigate('/rapports/nouveau')}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left border-2 border-transparent hover:border-blue-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Nouveau rapport</h4>
              <p className="text-sm text-gray-600">
                Créer un nouveau rapport d'expertise
              </p>
            </button>

            {/* Mes rapports */}
            <button
              onClick={() => navigate('/rapports')}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left border-2 border-transparent hover:border-green-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Mes rapports</h4>
              <p className="text-sm text-gray-600">
                Consulter tous les rapports d'expertise
              </p>
            </button>

            {/* Bureaux */}
            <button
              onClick={() => navigate('/bureaux')}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left border-2 border-transparent hover:border-purple-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Bureaux</h4>
              <p className="text-sm text-gray-600">
                Gérer les compagnies d'assurance
              </p>
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
