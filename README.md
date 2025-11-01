# Application Kanban - Projet ARI1 2025
Application de gestion de tâches avec un tableau Kanban, développée en React.

# Description
C'est un tableau Kanban qui permet de gérer ses tâches visuellement. Les tâches sont organisées en 3 colonnes :

À faire : Les nouvelles tâches

En cours : Ce sur quoi je travaille actuellement

Terminé : Les tâches finies

Le projet utilise React pour le frontend et json-server pour simuler une API backend.
# Technologies

React - Pour l'interface

Material UI - Pour le design

React Router - Pour la navigation entre les pages

json-server - Pour simuler une API REST (port 3001)

Vite - Pour le développement rapide (port 5173)

# Installation
Pré-requis: NodeJS

Télécharger le projet


```bash
git clone https://gitlab.univ-lille.fr/tiana.andrianirinarijaona.etu/ari1_2025_andrianirinarijaona_joelle_projet.git
cd kanban-project
```

Installer les dépendances

```npm install```

Lancer l'application

1. Le serveur (backend) dans un terminal :

```npm run server```

2. L'application React (frontend) dans un autre terminal :

```npm run dev```

Ensuite, ouvrir le navigateur sur : http://localhost:5173

# Fonctionnalités
Interface

- Tableau Kanban avec 3 colonnes
- Design avec Material UI
- Navigation entre les pages

Gestion des tâches

- Créer une tâche (titre, description, statut)
-  Voir les détails d'une tâche
-  Modifier une tâche
-  Supprimer une tâche
-  Changer le statut d'une tâche
-  Date de création automatique

Recherche et filtres

- Rechercher une tâche par son titre ou description
- Filtrer par statut (Tous, À faire, En cours, Terminé)
-  Compteur de tâches

API REST

- GET /tasks → Récupérer toutes les tâches
- POST /tasks → Créer une tâche
-  PUT /tasks/:id → Modifier une tâche
-  DELETE /tasks/:id → Supprimer une tâche
-  Les données sont sauvegardées automatiquement

Navigation (React Router)

-  / → Page principale (tableau Kanban)
-  /new → Créer une nouvelle tâche
-  /task/:id → Voir les détails d'une tâche
- /edit/:id → Modifier une tâche

# La "base de données"
Les tâches sont sauvegardées dans le fichier db.json. Quand on modifie une tâche dans l'application, le fichier se met à jour automatiquement !