import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { BureauxPage } from './pages/BureauxPage';
import { RapportsPage } from './pages/RapportsPage';
import { NouveauRapportPage } from './pages/NouveauRapportPage';
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

          {/* Rapports */}
          <Route
            path="/rapports"
            element={
              <ProtectedRoute>
                <RapportsPage />
              </ProtectedRoute>
            }
          />

          {/* Nouveau rapport */}
          <Route
            path="/rapports/nouveau"
            element={
              <ProtectedRoute>
                <NouveauRapportPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
