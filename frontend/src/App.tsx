import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { BureauxPage } from './pages/BureauxPage';
import { ProtectedRoute } from './components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Bureaux */}
          <Route
            path="/bureaux"
            element={
              <ProtectedRoute>
                <BureauxPage />
              </ProtectedRoute>
            }
          />

          {/* Rapports - Page placeholder */}
          <Route
            path="/rapports"
            element={
              <ProtectedRoute>
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
                    📊 Rapports
                  </h1>
                  <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                    Module en cours de développement
                  </p>
                  <a 
                    href="/dashboard"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    ← Retour au Dashboard
                  </a>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Page de test */}
          <Route
            path="/test"
            element={
              <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#10b981', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
                  ✅ NAVIGATION FONCTIONNE !
                </h1>
                <a 
                  href="/dashboard"
                  style={{
                    padding: '16px 32px',
                    backgroundColor: 'white',
                    color: '#10b981',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  Retour au Dashboard
                </a>
              </div>
            }
          />

          {/* Catch-all - doit être en dernier */}
          <Route 
            path="*" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      </Router>
      
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
