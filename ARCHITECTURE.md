# 📦 Expertise Auto - Structure du Projet

## 📁 Arborescence Complète

```
expertise-auto-app/
│
├── 📄 README.md                    # Documentation principale
├── 📄 DEMARRAGE_RAPIDE.md          # Guide de démarrage (5 min)
├── 📄 DEPLOIEMENT.md               # Guide de déploiement cloud
├── 📄 .gitignore                   # Fichiers à ignorer
│
├── 📁 backend/                     # API Node.js + Express
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── database.ts         # Configuration PostgreSQL
│   │   ├── 📁 controllers/
│   │   │   ├── authController.ts   # Authentification
│   │   │   ├── rapportController.ts # Gestion des rapports
│   │   │   └── bureauController.ts  # Gestion des bureaux
│   │   ├── 📁 middlewares/
│   │   │   └── auth.ts              # Middleware JWT
│   │   ├── 📁 models/
│   │   │   ├── User.ts              # Modèle utilisateur
│   │   │   ├── Bureau.ts            # Modèle bureau/compagnie
│   │   │   ├── Rapport.ts           # Modèle rapport
│   │   │   ├── Vehicule.ts          # Modèle véhicule
│   │   │   └── index.ts             # Relations & sync DB
│   │   ├── 📁 routes/
│   │   │   ├── authRoutes.ts        # Routes auth
│   │   │   ├── rapportRoutes.ts     # Routes rapports
│   │   │   └── bureauRoutes.ts      # Routes bureaux
│   │   ├── 📁 scripts/
│   │   │   └── seed.ts              # Script de données test
│   │   └── server.ts                # Point d'entrée serveur
│   ├── package.json
│   ├── tsconfig.json
│   ├── railway.json                 # Config Railway
│   ├── .env.example
│   └── .gitignore
│
└── 📁 frontend/                    # Application React
    ├── 📁 src/
    │   ├── 📁 components/           # Composants réutilisables
    │   ├── 📁 pages/
    │   │   ├── LoginPage.tsx        # Page de connexion
    │   │   └── DashboardPage.tsx    # Tableau de bord
    │   ├── 📁 services/
    │   │   ├── api.ts               # Client Axios
    │   │   └── authService.ts       # Service auth
    │   ├── 📁 stores/
    │   │   └── authStore.ts         # Store Zustand
    │   ├── App.tsx                  # Composant principal
    │   ├── main.tsx                 # Point d'entrée
    │   └── index.css                # Styles globaux
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts               # Config Vite
    ├── tailwind.config.js           # Config Tailwind
    ├── vercel.json                  # Config Vercel
    ├── .env.example
    └── .gitignore
```

## 🎯 Fonctionnalités Implémentées

### ✅ Backend (API REST)

#### Authentification
- [x] Inscription utilisateur
- [x] Connexion JWT
- [x] Récupération du profil
- [x] Middleware d'authentification
- [x] Gestion des rôles (Admin, Expert, Assistant)

#### Gestion des Rapports
- [x] Liste des rapports (avec pagination)
- [x] Création de rapport
- [x] Modification de rapport
- [x] Suppression de rapport
- [x] Filtrage par statut/sinistre
- [x] Relations avec Bureau et Véhicule

#### Gestion des Bureaux
- [x] CRUD complet
- [x] Recherche par code/nom
- [x] Liste complète des compagnies

#### Sécurité
- [x] Hash des mots de passe (bcrypt)
- [x] Tokens JWT avec expiration
- [x] Protection CORS
- [x] Validation des entrées
- [x] Helmet.js pour headers sécurisés

#### Base de Données
- [x] Modèles Sequelize
- [x] Relations entre tables
- [x] Migrations automatiques
- [x] Script de seed avec données test

### ✅ Frontend (React + TypeScript)

#### Interface Utilisateur
- [x] Design moderne avec Tailwind CSS
- [x] Responsive (mobile, tablette, desktop)
- [x] Composants réutilisables
- [x] Thème personnalisé

#### Authentification
- [x] Page de connexion
- [x] Gestion du token localStorage
- [x] Protection des routes
- [x] Store Zustand pour l'état auth

#### Dashboard
- [x] Tableau de bord avec KPIs
- [x] Actions rapides
- [x] Interface intuitive

#### PWA (Progressive Web App)
- [x] Configuration service worker
- [x] Manifest pour installation
- [x] Mode hors-ligne (cache)

## 🚀 Technologies Utilisées

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Typage statique
- **PostgreSQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Zustand** - Gestion d'état
- **TanStack Query** - Requêtes API
- **React Router** - Navigation

### DevOps & Déploiement
- **Vercel** - Hébergement frontend
- **Railway** - Hébergement backend + DB
- **GitHub** - Contrôle de version
- **Docker** - Conteneurisation (optionnel)

## 📊 Modèles de Données

### User (Utilisateur)
```typescript
{
  id: UUID
  email: string
  password: string (haché)
  nom: string
  prenom: string
  role: 'admin' | 'expert' | 'assistant'
  createdAt: Date
  updatedAt: Date
}
```

### Bureau (Compagnie d'assurance)
```typescript
{
  id: UUID
  code: string (unique)
  nomAgence: string
  responsableSinistres: string
  telephone: string
  email: string
  adresse: string
  createdAt: Date
}
```

### Rapport (Rapport d'expertise)
```typescript
{
  id: UUID
  typeRapport: 'estimatif_reparation' | 'valeur_venale' | 'tierce_expertise'
  numeroOrdreService: string
  bureauId: UUID (FK → Bureau)
  numeroSinistre: string
  dateSinistre: Date
  dateVisite: Date
  statut: 'brouillon' | 'en_cours' | 'termine' | 'archive'
  montantTotal: decimal
  userId: UUID (FK → User)
  createdAt: Date
  updatedAt: Date
}
```

### Vehicule
```typescript
{
  id: UUID
  rapportId: UUID (FK → Rapport)
  marque: string
  type: string
  genre: string
  immatriculation: string
  numeroChassis: string
  kilometrage: number
  dateMiseCirculation: Date
  couleur: string
  sourceEnergie: string
  puissanceFiscale: number
  valeurNeuve: decimal
}
```

## 🔐 Endpoints API

### Authentification
```
POST   /api/auth/register    # Inscription
POST   /api/auth/login       # Connexion
GET    /api/auth/profile     # Profil (auth requis)
```

### Rapports
```
GET    /api/rapports         # Liste (auth requis)
GET    /api/rapports/:id     # Détail (auth requis)
POST   /api/rapports         # Créer (auth requis)
PUT    /api/rapports/:id     # Modifier (auth requis)
DELETE /api/rapports/:id     # Supprimer (auth requis)
```

### Bureaux
```
GET    /api/bureaux          # Liste (auth requis)
GET    /api/bureaux/:id      # Détail (auth requis)
POST   /api/bureaux          # Créer (admin/expert)
PUT    /api/bureaux/:id      # Modifier (admin/expert)
DELETE /api/bureaux/:id      # Supprimer (admin only)
```

## 📈 Évolutions Futures (Non implémentées)

### Court terme
- [ ] Page de gestion des rapports complets
- [ ] Formulaire de création de rapport multi-étapes
- [ ] Dessin des chocs sur véhicule (Konva)
- [ ] Export PDF des rapports
- [ ] Gestion des photos
- [ ] Page inscription utilisateur
- [ ] Statistiques avancées

### Moyen terme
- [ ] Import/Export Excel
- [ ] Gestion des sinistres
- [ ] Calculs automatiques (vétusté, honoraires)
- [ ] Signature électronique
- [ ] Notifications

### Long terme
- [ ] Application mobile React Native
- [ ] OCR pour cartes grises
- [ ] Intelligence artificielle
- [ ] Mode multi-tenant (SaaS)

## 💡 Notes Importantes

### Ce qui fonctionne dès maintenant :
✅ Authentification complète
✅ Création/Lecture/Modification/Suppression des rapports
✅ Gestion complète des bureaux
✅ Base de données PostgreSQL avec relations
✅ API REST sécurisée
✅ Interface responsive
✅ Déploiement cloud ready

### Ce qui reste à implémenter :
⚠️ Formulaire complet de création de rapport
⚠️ Dessin des chocs sur véhicule
⚠️ Export PDF
⚠️ Import/Export Excel
⚠️ Statistiques détaillées
⚠️ Module photos

## 🎓 Comment Continuer le Développement

1. **Ajouter le formulaire de rapport complet** :
   - Créer `frontend/src/pages/RapportCreatePage.tsx`
   - Implémenter les étapes (Wizard)
   - Ajouter la validation avec React Hook Form

2. **Implémenter le dessin de chocs** :
   - Utiliser Konva.js (déjà dans les dépendances)
   - Créer un composant `VehicleCanvas.tsx`
   - Sauvegarder le SVG dans la base

3. **Générer des PDF** :
   - Utiliser PDFKit côté backend
   - Créer un template de rapport
   - Endpoint `/api/rapports/:id/pdf`

4. **Import/Export Excel** :
   - Utiliser ExcelJS (déjà dans les dépendances)
   - Endpoints `/api/export/excel` et `/api/import/excel`

## 📞 Support

Pour toute question :
- Consulter le README.md
- Lire DEMARRAGE_RAPIDE.md
- Voir DEPLOIEMENT.md

---

**Version : 1.0.0**
**Dernière mise à jour : Février 2026**
