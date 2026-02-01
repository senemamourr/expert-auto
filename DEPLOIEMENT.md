# 🚀 Guide de Déploiement Cloud

Ce guide vous accompagne pas à pas pour déployer l'application Expertise Auto sur Vercel (frontend) et Railway (backend + base de données).

## 📋 Prérequis

- ✅ Compte GitHub
- ✅ Code source pushé sur GitHub
- ✅ Compte Vercel (gratuit)
- ✅ Compte Railway (gratuit avec $5 de crédit)

## 🎯 Vue d'ensemble

```
GitHub Repository
    ↓
    ├── Frontend → Vercel → https://expertise-auto.vercel.app
    └── Backend  → Railway → https://expertise-auto-api.railway.app
                      ↓
                   PostgreSQL (Railway)
```

---

## PARTIE 1️⃣ : Déploiement du Backend (Railway)

### Étape 1 : Créer un compte Railway

1. Aller sur https://railway.app
2. Cliquer sur "Start a New Project"
3. Se connecter avec GitHub

### Étape 2 : Créer un nouveau projet

1. Cliquer sur "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Autoriser Railway à accéder à vos repos GitHub
4. Sélectionner le repository `expertise-auto-app`

### Étape 3 : Configurer le service Backend

1. Railway va détecter automatiquement le projet Node.js
2. Aller dans "Settings" → "Root Directory"
3. Définir le root directory : `backend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`

### Étape 4 : Ajouter PostgreSQL

1. Dans votre projet Railway, cliquer sur "+ New"
2. Sélectionner "Database" → "PostgreSQL"
3. Railway créera automatiquement une base de données
4. La variable `DATABASE_URL` sera automatiquement disponible

### Étape 5 : Configurer les variables d'environnement

Dans Railway, aller dans le service Backend → "Variables" :

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=<GÉNÉRER_UN_SECRET_FORT_ICI>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

**⚠️ Important :** Pour `JWT_SECRET`, générez un secret fort :
```bash
# Dans votre terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Étape 6 : Déployer

1. Cliquer sur "Deploy"
2. Railway va automatiquement :
   - Installer les dépendances
   - Compiler TypeScript
   - Démarrer le serveur
3. Attendre quelques minutes...

### Étape 7 : Obtenir l'URL de l'API

1. Dans Railway, aller dans "Settings" → "Networking"
2. Cliquer sur "Generate Domain"
3. Vous obtiendrez une URL comme : `https://expertise-auto-production.up.railway.app`
4. **Noter cette URL** - vous en aurez besoin pour le frontend

### Étape 8 : Tester l'API

```bash
# Test de santé
curl https://votre-app.railway.app/health

# Devrait retourner :
# {"status":"OK","message":"API Expertise Auto en ligne"}
```

✅ **Backend déployé avec succès !**

---

## PARTIE 2️⃣ : Déploiement du Frontend (Vercel)

### Étape 1 : Créer un compte Vercel

1. Aller sur https://vercel.com
2. Cliquer sur "Sign Up"
3. Se connecter avec GitHub

### Étape 2 : Importer le projet

1. Dans le dashboard Vercel, cliquer sur "Add New..." → "Project"
2. Sélectionner votre repository `expertise-auto-app`
3. Cliquer sur "Import"

### Étape 3 : Configurer le projet

**Framework Preset:** Vite
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Étape 4 : Variables d'environnement

Dans "Environment Variables", ajouter :

```env
VITE_API_URL=https://votre-app.railway.app
```

**⚠️ Remplacer** `votre-app.railway.app` par l'URL obtenue à l'étape 1.7

### Étape 5 : Déployer

1. Cliquer sur "Deploy"
2. Vercel va :
   - Installer les dépendances
   - Builder l'application React
   - Déployer sur CDN global
3. Attendre 2-3 minutes...

### Étape 6 : Obtenir l'URL de l'application

Vercel vous donnera une URL comme :
- `https://expertise-auto.vercel.app`
- ou votre domaine personnalisé

✅ **Frontend déployé avec succès !**

---

## PARTIE 3️⃣ : Configuration finale

### Mettre à jour le CORS

1. Retourner dans Railway → Service Backend → Variables
2. Modifier `CORS_ORIGIN` :
   ```env
   CORS_ORIGIN=https://expertise-auto.vercel.app
   ```
3. Le backend va automatiquement redémarrer

### Créer le premier utilisateur admin

```bash
# Remplacer par votre URL Railway
curl -X POST https://votre-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@expertise-auto.com",
    "password": "ChangeMe123!",
    "nom": "Admin",
    "prenom": "Super",
    "role": "admin"
  }'
```

### Tester l'application complète

1. Ouvrir `https://expertise-auto.vercel.app`
2. Se connecter avec les identifiants créés
3. Vérifier que tout fonctionne

---

## 🎉 Félicitations !

Votre application est maintenant en ligne et accessible partout dans le monde !

## 📊 URLs importantes

- **Application Frontend:** https://expertise-auto.vercel.app
- **API Backend:** https://votre-app.railway.app
- **Documentation API:** https://votre-app.railway.app/health
- **Dashboard Railway:** https://railway.app/dashboard
- **Dashboard Vercel:** https://vercel.com/dashboard

---

## 🔄 Mises à jour automatiques

**L'application se mettra à jour automatiquement** à chaque push sur GitHub :

```bash
# 1. Modifier le code localement
# 2. Commit et push
git add .
git commit -m "Nouvelle fonctionnalité"
git push origin main

# 3. Vercel et Railway déploient automatiquement !
```

---

## 💰 Coûts

### Vercel (Frontend)
- ✅ **Gratuit** pour toujours
- Bande passante : 100GB/mois
- Builds : Illimités

### Railway (Backend + DB)
- ✅ **$5 de crédit gratuit** chaque mois
- Après épuisement : ~$5-10/mois selon utilisation
- PostgreSQL inclus

**Total estimé : 0-10$/mois**

---

## 🆘 Problèmes fréquents

### Erreur "Cannot connect to database"
**Solution :** Vérifier que `DATABASE_URL` est bien configuré dans Railway

### Erreur CORS
**Solution :** Vérifier que `CORS_ORIGIN` dans Railway correspond à l'URL Vercel

### Build failed sur Vercel
**Solution :** Vérifier que `VITE_API_URL` est bien défini

### 502 Bad Gateway
**Solution :** Le backend Railway démarre (attendre 1-2 minutes)

---

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifier les logs dans Railway/Vercel
2. Consulter la section "Résolution de problèmes" du README
3. Créer une issue GitHub

---

**🚀 Bon déploiement !**
