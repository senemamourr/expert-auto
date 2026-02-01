# 🚗 Expertise Auto - Application Web de Gestion d'Expertise Automobile

Application web moderne pour la gestion des rapports d'expertise automobile, avec support hors-ligne (PWA) et déploiement cloud.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Stack Technique](#stack-technique)
- [Architecture](#architecture)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)

## ✨ Fonctionnalités

### Gestion des Rapports
- ✅ Création de rapports d'expertise (Estimatif, Valeur vénale, Tierce expertise)
- ✅ Formulaire multi-étapes avec validation
- ✅ Gestion des véhicules et assurés
- ✅ Calculs automatiques (montants, vétusté, honoraires)
- ✅ Statuts des rapports (brouillon, en cours, terminé, archivé)

### Gestion des Bureaux
- ✅ CRUD complet des compagnies d'assurance
- ✅ Autocomplétion par code bureau
- ✅ Gestion des coordonnées complètes

### Statistiques & Tableaux de bord
- ✅ Dashboard avec KPIs
- ✅ Statistiques de revenus
- ✅ Graphiques mensuels

### Sécurité
- ✅ Authentification JWT
- ✅ Gestion des rôles (Admin, Expert, Assistant)
- ✅ Protection des routes
- ✅ Validation des données

### Mode Hors-ligne (PWA)
- ✅ Fonctionne sans connexion internet
- ✅ Synchronisation automatique
- ✅ Cache intelligent

## 🛠 Stack Technique

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Zustand** - Gestion d'état
- **TanStack Query** - Gestion des requêtes
- **React Router** - Navigation
- **PWA** - Progressive Web App

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Typage statique
- **PostgreSQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe

### DevOps
- **Vercel** - Hébergement frontend
- **Railway/Render** - Hébergement backend + DB
- **GitHub** - Contrôle de version

## 🏗 Architecture

```
expertise-auto-app/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages de l'application
│   │   ├── services/     # Services API
│   │   ├── stores/       # Stores Zustand
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utilitaires
│   ├── public/           # Assets statiques
│   └── package.json
│
└── backend/              # API Node.js
    ├── src/
    │   ├── controllers/  # Contrôleurs
    │   ├── models/       # Modèles Sequelize
    │   ├── routes/       # Routes API
    │   ├── services/     # Logique métier
    │   ├── middlewares/  # Middlewares
    │   ├── config/       # Configuration
    │   └── server.ts     # Point d'entrée
    └── package.json
```

## 🚀 Installation

### Prérequis
- Node.js 20+ et npm
- PostgreSQL 16+ (ou utiliser Railway/Render pour la DB)
- Git

### 1. Cloner le repository

```bash
git clone <votre-repo>
cd expertise-auto-app
```

### 2. Configuration Backend

```bash
cd backend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
```

Modifier `.env` avec vos informations :
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/expertise_auto
JWT_SECRET=votre_secret_très_sécurisé
CORS_ORIGIN=http://localhost:5173
```

### 3. Configuration Frontend

```bash
cd ../frontend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
```

Modifier `.env` :
```env
VITE_API_URL=http://localhost:3000
```

### 4. Initialiser la base de données

```bash
cd ../backend

# Créer la base de données PostgreSQL
createdb expertise_auto

# Les tables seront créées automatiquement au démarrage
```

### 5. Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

L'application sera accessible sur : http://localhost:5173

## 🌐 Déploiement

### Déploiement Backend (Railway)

1. Créer un compte sur [Railway.app](https://railway.app)
2. Créer un nouveau projet
3. Ajouter un service PostgreSQL
4. Déployer depuis GitHub :
   - Connecter votre repository
   - Sélectionner le dossier `backend`
   - Railway détectera automatiquement Node.js

5. Configurer les variables d'environnement dans Railway :
   ```env
   NODE_ENV=production
   JWT_SECRET=<générer-un-secret-fort>
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   CORS_ORIGIN=https://votre-app.vercel.app
   ```

6. Votre API sera déployée sur : `https://votre-app.railway.app`

### Déploiement Frontend (Vercel)

1. Créer un compte sur [Vercel.com](https://vercel.com)
2. Importer votre projet depuis GitHub
3. Configurer :
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Variables d'environnement :
   ```env
   VITE_API_URL=https://votre-app.railway.app
   ```

5. Déployer ! Votre app sera sur : `https://votre-app.vercel.app`

### Alternative : Déploiement Backend (Render)

1. Créer un compte sur [Render.com](https://render.com)
2. Nouveau Web Service depuis GitHub
3. Configuration :
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

4. Ajouter une base PostgreSQL
5. Configurer les variables d'environnement

## 📱 Utilisation

### Création du premier utilisateur (Admin)

```bash
# Via l'API directement
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "MotDePasseSecurise123!",
    "nom": "Admin",
    "prenom": "Super",
    "role": "admin"
  }'
```

### Connexion

1. Ouvrir l'application : http://localhost:5173
2. Se connecter avec les identifiants créés
3. Accéder au dashboard

### Créer un rapport

1. Dashboard → "Nouveau rapport"
2. Remplir les informations :
   - Type de rapport
   - Informations du bureau (compagnie)
   - Numéro de sinistre
   - Informations du véhicule
3. Enregistrer en brouillon ou finaliser

## 📚 API Documentation

### Authentification

**POST /api/auth/register**
```json
{
  "email": "expert@example.com",
  "password": "password123",
  "nom": "Dupont",
  "prenom": "Jean",
  "role": "expert"
}
```

**POST /api/auth/login**
```json
{
  "email": "expert@example.com",
  "password": "password123"
}
```

**GET /api/auth/profile**
```
Headers: Authorization: Bearer <token>
```

### Rapports

**GET /api/rapports**
```
Headers: Authorization: Bearer <token>
Query: ?page=1&limit=10&statut=brouillon&numeroSinistre=XXX
```

**POST /api/rapports**
```json
{
  "typeRapport": "estimatif_reparation",
  "bureauId": "uuid",
  "numeroSinistre": "2024-001",
  "dateSinistre": "2024-01-15",
  "vehicule": {
    "marque": "Peugeot",
    "type": "208",
    "genre": "VP",
    "immatriculation": "AA-123-BB"
  }
}
```

**PUT /api/rapports/:id**
**DELETE /api/rapports/:id**

### Bureaux

**GET /api/bureaux**
**POST /api/bureaux**
**PUT /api/bureaux/:id**
**DELETE /api/bureaux/:id**

## 🔧 Scripts Disponibles

### Backend
```bash
npm run dev          # Démarrage en mode développement
npm run build        # Compilation TypeScript
npm start            # Démarrage en production
```

### Frontend
```bash
npm run dev          # Démarrage en mode développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
```

## 🐛 Résolution de problèmes

### Erreur de connexion à la base de données
- Vérifier que PostgreSQL est démarré
- Vérifier le `DATABASE_URL` dans `.env`
- Vérifier les credentials PostgreSQL

### Erreur CORS
- Vérifier que `CORS_ORIGIN` correspond à l'URL du frontend
- En développement : `http://localhost:5173`
- En production : votre domaine Vercel

### Token JWT invalide
- Vérifier que `JWT_SECRET` est le même en dev et prod
- Nettoyer le localStorage du navigateur

## 📄 Licence

MIT

## 👥 Support

Pour toute question ou problème, créer une issue sur GitHub.

---

**Développé avec ❤️ pour moderniser la gestion d'expertise automobile**
