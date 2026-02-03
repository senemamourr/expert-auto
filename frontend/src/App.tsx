import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Import conditionnel pour éviter les erreurs
import { BureauxPage } from './pages/BureauxPage';

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

          {/* Rapports - Placeholder temporaire */}
          <Route
            path="/rapports"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 p-8">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">📊 Rapports</h1>
                    <p className="text-gray-600">Page en cours de développement...</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Test page */}
          <Route
            path="/test"
            element={
              <div className="min-h-screen bg-green-500 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">✅ Navigation fonctionne !</h1>
              </div>
            }
          />

          {/* Catch-all - IMPORTANT : doit être en dernier */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
