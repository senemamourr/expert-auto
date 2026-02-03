export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>Expertise Auto</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>{user.prenom} {user.nom}</span>
            <button 
              onClick={handleLogout}
              style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Tableau de bord</h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>Bienvenue {user.prenom}</p>

        {/* TEST SECTION - BIG YELLOW BOX */}
        <div style={{ 
          backgroundColor: '#fef3c7', 
          border: '3px solid #f59e0b', 
          padding: '32px', 
          borderRadius: '12px', 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#92400e' }}>
            🧪 TESTS DE NAVIGATION
          </h3>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
            <a 
              href="/test"
              style={{ 
                display: 'block',
                padding: '16px 32px', 
                backgroundColor: '#10b981', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              Aller sur /test
            </a>
            
            <a 
              href="/bureaux"
              style={{ 
                display: 'block',
                padding: '16px 32px', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              Aller sur /bureaux
            </a>
            
            <a 
              href="/rapports"
              style={{ 
                display: 'block',
                padding: '16px 32px', 
                backgroundColor: '#8b5cf6', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              Aller sur /rapports
            </a>
          </div>

          <p style={{ fontSize: '14px', color: '#78350f' }}>
            Cliquez sur ces liens pour tester la navigation
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Rapports totaux</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>0</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>En cours</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b' }}>0</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Terminés</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>0</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Revenus du mois</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>0 CFA</div>
          </div>
        </div>

        {/* Actions rapides avec LIENS */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Actions rapides</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            
            <a 
              href="/rapports"
              style={{ 
                display: 'block',
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                border: '2px solid transparent',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>📊 Mes rapports</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>Consulter tous les rapports</div>
            </a>

            <a 
              href="/bureaux"
              style={{ 
                display: 'block',
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                border: '2px solid transparent',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>🏢 Bureaux</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>Gérer les compagnies</div>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
