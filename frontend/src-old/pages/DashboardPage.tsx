import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Expertise Auto
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                {user?.prenom} {user?.nom}
              </span>
              <button onClick={handleLogout} className="btn-secondary">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-600">
            Bienvenue {user?.prenom}, gérez vos rapports d'expertise
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Rapports totaux
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              En cours
            </h3>
            <p className="text-3xl font-bold text-yellow-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Terminés
            </h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Revenus du mois
            </h3>
            <p className="text-3xl font-bold text-primary-600">0 CFA</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary p-6 text-left">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="font-medium">Nouveau rapport</p>
              <p className="text-sm opacity-75">Créer un rapport d'expertise</p>
            </button>

            <button className="btn-secondary p-6 text-left">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium">Mes rapports</p>
              <p className="text-sm opacity-75">Consulter tous les rapports</p>
            </button>

            <button className="btn-secondary p-6 text-left">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="font-medium">Bureaux</p>
              <p className="text-sm opacity-75">Gérer les compagnies</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
