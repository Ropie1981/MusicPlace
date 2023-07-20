# MusicPlace - Annonce d'instruments de musique

Ce projet est réalisé en Checkpoint #4 de ma formation développeur Web à la Wild Code School de Lyon

MusicPlace est un site d'annonce dédié aux instruments de musique, où les utilisateurs peuvent vendre, acheter ou échanger leurs instruments. Ce projet est développé en utilisant la stack React-Express-MySQL, apprise à Wild Code School. Il est conçu pour aider les étudiants à produire un code de qualité professionnelle, tout en restant aussi simple que possible à utiliser.

## Configuration & Utilisation

### Initialisation du Projet

- Dans VSCode, installez les plugins **Prettier - Code formatter** et **ESLint**, puis configurez-les.
- Clonez ce dépôt et entrez dedans.
- Si vous utilisez `yarn` ou `pnpm`, adaptez la configuration dans `config/cli` du fichier `package.json`.
- Exécutez la commande `npm install`.
- _NB: Pour lancer le serveur backend, vous aurez besoin d'un fichier d'environnement avec les identifiants de la base de données. Vous trouverez un modèle dans `backend/.env.sample`._

### Commandes Disponibles

- `migrate`: Exécute le script de migration de la base de données.
- `dev`: Démarre les deux serveurs (frontend + backend) dans un seul terminal.
- `dev-front`: Démarre le serveur React frontend.
- `dev-back`: Démarre le serveur Express backend.
- `lint`: Exécute les outils de validation et refuse le code non conforme (sera exécuté à chaque _commit_).
- `fix`: Corrige les erreurs du linter (exécutez cette commande si `lint` signale des problèmes dans votre code !)

## FAQ

### Outils Utilisés

- _Concurrently_ : Permet d'exécuter plusieurs commandes simultanément dans la même interface en ligne de commande (CLI).
- _Husky_ : Permet d'exécuter des commandes spécifiques déclenchées par des événements _git_.
- _Vite_ : Alternative à _Create-React-App_, avec moins d'outils pour une expérience plus fluide.
- _ESLint_ : Outil de qualité du code, garantissant que les règles choisies seront appliquées.
- _Prettier_ : Autre outil de qualité du code, se concentre sur les règles de style.
- _Airbnb Standard_ : L'une des normes les plus connues, bien que n'étant pas officiellement liée à ES/JS.
- _Nodemon_ : Permet de redémarrer le serveur à chaque fois qu'un fichier .js est modifié.
- _Material-UI_ : Bibliothèque d'interface utilisateur pour React, facilitant la création d'une interface esthétique et conviviale.
- _NodeMailer_ : Module Node.js pour envoyer des e-mails depuis le serveur, utile pour l'envoi de notifications et de messages aux utilisateurs.
- _Multer_ : Middleware Node.js pour gérer les téléchargements de fichiers, permettant le stockage d'images ou d'autres types de fichiers sur le serveur.
- _Axios_ : Bibliothèque pour effectuer des requêtes HTTP depuis le frontend vers le backend, facilitant la communication entre les deux parties de l'application.

### Déploiement

Pour le déploiement, vous devez accéder à `secrets` → app `actions` sur le dépôt GitHub pour insérer les informations via `New repository secret` :

- CAPROVER_BACK_APPNAME : nom de l'application sur CapRover pour le backend
- CAPROVER_FRONT_APPNAME : nom de l'application sur CapRover pour le frontend
- CAPROVER_PASSWORD : mot de passe de CapRover
- CAPROVER_SERVER : lien du domaine du serveur CapRover

## Note

Dédicace à Pierre P et Margaux DF !
