import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  console.log('🚀 App rendering...');
  
  return (
    <Router>
      <Routes>
        {/* Page de test simple */}
        <Route 
          path="/test" 
          element={
            <div style={{ 
              minHeight: '100vh', 
              backgroundColor: '#10b981', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <h1 style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>
                ✅ ROUTE /test FONCTIONNE !
              </h1>
            </div>
          } 
        />

        {/* Dashboard simple */}
        <Route 
          path="/dashboard" 
          element={
            <div style={{ padding: '40px' }}>
              <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Dashboard</h1>
              <a href="/test" style={{ color: 'blue', textDecoration: 'underline' }}>
                Aller sur /test
              </a>
            </div>
          } 
        />

        {/* Route par défaut */}
        <Route 
          path="*" 
          element={
            <div style={{ padding: '40px' }}>
              <h1>Route catch-all</h1>
              <p>Vous êtes sur une route non définie</p>
              <a href="/dashboard">Dashboard</a>
              {' | '}
              <a href="/test">Test</a>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
