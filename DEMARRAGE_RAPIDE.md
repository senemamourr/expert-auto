# ⚡ Guide de Démarrage Rapide

Ce guide vous permet de lancer l'application en **5 minutes** en local.

## 🎯 Méthode Rapide (Recommandée)

### 1️⃣ Prérequis

```bash
# Vérifier Node.js (20+)
node --version

# Vérifier PostgreSQL
psql --version
```

Si PostgreSQL n'est pas installé :
- **macOS:** `brew install postgresql@16`
- **Ubuntu:** `sudo apt install postgresql-16`
- **Windows:** Télécharger depuis postgresql.org

### 2️⃣ Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd expertise-auto-app

# Installer les dépendances BACKEND
cd backend
npm install

# Installer les dépendances FRONTEND
cd ../frontend
npm install
```

### 3️⃣ Configuration

```bash
# Backend - Créer .env
cd backend
cp .env.example .env
```

Modifier `backend/.env` :
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/expertise_auto
JWT_SECRET=mon_secret_super_securise_123456789
```

```bash
# Frontend - Créer .env
cd ../frontend
cp .env.example .env
```

Le fichier `frontend/.env` par défaut est déjà bon !

### 4️⃣ Base de données

```bash
# Créer la base de données
createdb expertise_auto

# OU avec psql
psql -U postgres
CREATE DATABASE expertise_auto;
\q

# Initialiser avec des données de test
cd backend
npm run seed
```

Vous aurez :
- ✅ Un admin : `admin@expertise-auto.com` / `Admin123!`
- ✅ Un expert : `expert@expertise-auto.com` / `Expert123!`
- ✅ 5 compagnies d'assurance

### 5️⃣ Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ API disponible sur http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Application disponible sur http://localhost:5173

### 6️⃣ Se connecter

1. Ouvrir http://localhost:5173
2. Connexion avec :
   - Email: `admin@expertise-auto.com`
   - Mot de passe: `Admin123!`

---

## 🐳 Méthode Alternative : Docker (Bientôt disponible)

```bash
# Une seule commande !
docker-compose up
```

---

## ✅ Vérification

### Tester le Backend
```bash
# Santé de l'API
curl http://localhost:3000/health

# Devrait retourner :
# {"status":"OK","message":"API Expertise Auto en ligne"}
```

### Tester le Frontend
Ouvrir http://localhost:5173 dans le navigateur

---

## 🆘 Problèmes fréquents

### ❌ Erreur "Cannot connect to database"

**Solution 1 - PostgreSQL n'est pas démarré :**
```bash
# macOS
brew services start postgresql@16

# Ubuntu
sudo systemctl start postgresql

# Windows
# Démarrer le service PostgreSQL depuis Services
```

**Solution 2 - Mauvais credentials :**
Modifier `DATABASE_URL` dans `backend/.env`

### ❌ Port 3000 déjà utilisé

```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9

# OU changer le port dans backend/.env
PORT=3001
```

### ❌ Port 5173 déjà utilisé

```bash
# Trouver et tuer le processus
lsof -ti:5173 | xargs kill -9
```

### ❌ npm install échoue

```bash
# Nettoyer le cache
npm cache clean --force

# Supprimer node_modules
rm -rf node_modules package-lock.json

# Réinstaller
npm install
```

---

## 📚 Prochaines étapes

1. ✅ L'application fonctionne en local
2. 📖 Lire le [README.md](README.md) complet
3. 🚀 Déployer en production : [DEPLOIEMENT.md](DEPLOIEMENT.md)
4. 🎨 Personnaliser l'application
5. 📊 Créer vos premiers rapports

---

## 🎓 Tutoriel Complet

### Créer votre premier rapport

1. Se connecter au dashboard
2. Cliquer sur "Nouveau rapport"
3. Remplir les informations :
   ```
   Type: Estimatif de réparation
   Bureau: AXA001
   N° Sinistre: 2024-001
   Date sinistre: Aujourd'hui
   ```
4. Ajouter les infos véhicule :
   ```
   Marque: Peugeot
   Type: 208
   Genre: VP
   Immatriculation: DK-1234-AA
   ```
5. Enregistrer

---

## 💡 Astuces

### Réinitialiser la base de données

```bash
cd backend
npm run seed
```
⚠️ Cela supprimera toutes les données existantes !

### Voir les logs du backend

Les logs s'affichent directement dans le terminal où `npm run dev` tourne.

### Mode debug Frontend

Ouvrir les DevTools du navigateur (F12) → Console

---

## 📞 Besoin d'aide ?

- 📖 Documentation complète : [README.md](README.md)
- 🚀 Guide de déploiement : [DEPLOIEMENT.md](DEPLOIEMENT.md)
- 🐛 Reporter un bug : GitHub Issues

---

**🎉 Bon développement !**
