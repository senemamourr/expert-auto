import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { syncDatabase } from './models';

// Routes
import authRoutes from './routes/authRoutes';
import rapportRoutes from './routes/rapportRoutes';
import bureauRoutes from './routes/bureauRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité et utilitaires
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logs en développement
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Route de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API Expertise Auto en ligne',
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/rapports', rapportRoutes);
app.use('/api/bureaux', bureauRoutes);

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.originalUrl,
  });
});

// Gestionnaire d'erreurs global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Erreur:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log('🔄 Démarrage du serveur...');
    console.log('=================================');
    
    // Tester la connexion à la base de données
    console.log('📊 Test de connexion à la base de données...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Impossible de démarrer le serveur sans connexion à la base de données');
      process.exit(1);
    }
    
    console.log('✅ Connexion à la base de données réussie');

    // Synchroniser les modèles
    console.log('🔧 Synchronisation des modèles avec la base de données...');
    
    // ⚠️ TEMPORAIRE : Forcer alter: true pour créer la colonne tauxHoraire
    // À remettre à false après le premier déploiement
    const syncMode = true; // FORCE ALTER MODE
    
    await syncDatabase(syncMode);
    
    console.log('✅ Tables synchronisées (mode: ALTER FORCÉ - création colonne tauxHoraire)');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log('=================================');
      console.log('🚀 Serveur démarré avec succès !');
      console.log('=================================');
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${PORT}`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
      console.log('=================================');
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    console.error('Stack:', (error as Error).stack);
    process.exit(1);
  }
};

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

startServer();

export default app;
