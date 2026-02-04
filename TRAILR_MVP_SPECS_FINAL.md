# TRAILR — Spécifications MVP Complètes

> **"Scroll trailers. Find your next."**

---

## 1. Vision Produit

### Positionnement
**TikTok pour bandes-annonces** — Une application mobile de découverte de films et séries basée sur le swipe de bandes-annonces.

### Problème résolu
"Qu'est-ce qu'on regarde ce soir ?" — Résolu en moins de 2 minutes.

### Cible
- Films et séries **déjà disponibles** en streaming
- Pas de promo avant-sortie (hors scope MVP)

### Marché initial
France — Bandes-annonces en VF uniquement

### Personas

| Persona | Besoin | Usage |
|---------|--------|-------|
| **Clara** | Décider vite | Swipe rapide, watchlist, décision ce soir |
| **Max** | Organiser une soirée | Quiz Tonight, partage |
| **Lina** | Découvrir des pépites | Feed personnalisé, exploration |

### Métrique nord-star
**Time-to-pick < 2 minutes** via le Quiz Tonight

---

## 2. Stack Technique

### Frontend
| Techno | Usage |
|--------|-------|
| **React Native** | Framework mobile cross-platform |
| **Expo** | Toolchain, build, déploiement |
| **Expo Go** | Tests en développement |
| **EAS Build** | Compilation cloud (iOS + Android) |

### Backend
| Techno | Usage |
|--------|-------|
| **Supabase** | Base de données PostgreSQL + Auth + Edge Functions |
| **Supabase Auth** | Authentification (Apple, Google) |
| **Supabase Edge Functions** | API serverless (appels IA sécurisés) |

### APIs externes
| Service | Usage |
|---------|-------|
| **TMDB API** | Métadonnées films/séries (titres, synopsis, casting, genres, notes) |
| **YouTube API** | Recherche et lecture des bandes-annonces |
| **OpenAI GPT-4o mini** | Quiz Tonight + phrases personnalisées |

### Hébergement
| Service | Usage |
|---------|-------|
| **EAS** | Build et distribution des apps |
| **App Store** | Distribution iOS |
| **Google Play** | Distribution Android |

### Environnement de développement (Windows)
| Outil | Usage |
|-------|-------|
| VS Code | Éditeur de code |
| Node.js | Runtime JavaScript |
| Expo CLI | Ligne de commande Expo |
| Expo Go (app mobile) | Tests sur téléphone réel |
| Android Studio (optionnel) | Émulateur Android |

### Tests en local
```
1. Installer Expo Go sur ton téléphone (App Store / Google Play)
2. Lancer le projet : npx expo start
3. Scanner le QR code avec ton téléphone
4. L'app se charge en temps réel
5. Hot reload : chaque modif s'affiche instantanément
```

### Coût estimé MVP
| Service | Coût |
|---------|------|
| Supabase (free tier) | 0€ |
| TMDB API | Gratuit |
| YouTube API | Gratuit |
| OpenAI | ~5-15€/mois |
| Expo/EAS | Gratuit (free tier) |
| Apple Developer | 99€/an |
| Google Play | 25€ (one-time) |
| **Total année 1** | ~150-200€ |

---

## 3. Sourcing des Bandes-Annonces

### Stratégie
Utiliser les **chaînes YouTube officielles des distributeurs français** pour garantir :
- Bandes-annonces en VF
- Contenu officiel (pas de fan-made)
- Pas d'outro promotionnelle

### Pipeline de sourcing
```
1. Récupérer le film/série via TMDB
2. Identifier le distributeur français
3. Mapping distributeur → channel_id YouTube
4. Recherche par titre sur la chaîne ciblée
5. Stockage du lien (one-shot, pas de polling)
```

### Distributeurs principaux
- Warner Bros France
- Universal Pictures France
- Disney FR
- Sony Pictures France
- StudioCanal
- Pathé
- Gaumont
- SND Films
- Metropolitan
- Le Pacte

### Gestion des indisponibilités
- Si BA non trouvée → film exclu du feed
- Priorité aux films avec BA disponible
- Enrichissement progressif du catalogue

---

## 4. Architecture des Features MVP

| Groupe | Features |
|--------|----------|
| **0. Authentification** | Splash, connexion, session persistante |
| **1. Onboarding** | Plateformes, genres, calibrage mood |
| **2. Feed BA** | Swipe, like, dislike, watchlist, j'ai vu |
| **3. Quiz Tonight** | Conversation IA, Top 10 |
| **4. Suivi visionnage** | Notation, relances groupées |

---

## 5. Groupe 0 : Authentification

### Écran Splash
- Logo TRAILR (icône play + nom)
- Tagline : "Scroll trailers. Find your next."
- Bouton "Commencer"
- Image cinématique en fond (blur + gradient)

### Écran Connexion
```
[ 🍎 Continuer avec Apple ]
[ 🔵 Continuer avec Google ]
──────── Ou ────────
[ Continuer en tant qu'invité ]
```

### Options de connexion

| Méthode | Données récupérées |
|---------|-------------------|
| Apple | Email (masqué possible), nom |
| Google | Email, nom, photo |
| Invité | Rien, données locales uniquement |

### Session persistante
- Access token + Refresh token gérés par Supabase
- Pas de reconnexion à chaque lancement
- Déconnexion uniquement si : manuelle, désinstallation, ou révocation serveur

### Flow utilisateur

| Situation | Flow |
|-----------|------|
| Premier lancement | Splash → Connexion → Onboarding → Feed |
| Retour (connecté) | Splash (1-2s) → Feed |
| Retour (invité) | Splash (1-2s) → Feed |
| Déconnexion manuelle | Splash → Connexion |

### Mode invité
- Données stockées localement
- Watchlist, likes, dislikes fonctionnent
- Pas de sync multi-appareils
- Incitation à créer un compte dans le profil

---

## 6. Groupe 1 : Onboarding

### Principes
- 3 étapes avec indicateur de progression
- Chaque étape skippable
- Skip global possible avec message d'avertissement
- Modifiable plus tard dans les settings

### Étape 1 : Plateformes

**Question** : "Où tu regardes ?"

**Plateformes** :
- Netflix
- Prime Video
- Disney+
- Canal+
- Apple TV+
- OCS
- Paramount+
- MUBI

**Règles** :
- Multi-sélection
- Skippable (minimum 0)
- Sert à prioriser (pas filtrer par défaut)

### Étape 2 : Genres favoris

**Question** : "Qu'est-ce qui te fait vibrer ?"

**Genres** :
| Genre | Emoji |
|-------|-------|
| Action | 💥 |
| Comédie | 😂 |
| Drame | 🎭 |
| Horreur | 😱 |
| Thriller | 🔪 |
| Romance | 💕 |
| Sci-Fi | 🚀 |
| Fantaisie | 🧙 |
| Animation | 🎨 |
| Historique | 📜 |
| Documentaire | 📹 |
| Policier | 🔍 |

**Règles** :
- Multi-sélection
- Skippable (minimum 0)

### Étape 3 : Calibrage Mood

**Question** : "Affine ton profil de base"

**Sliders (1-5)** :

| Dimension | Min (1) | Max (5) | Défaut |
|-----------|---------|---------|--------|
| Intensité | Calme | Épique | 3 |
| Rythme | Contemplatif | Effréné | 3 |
| Tolérance tension | Aucune | Hardcore | 3 |
| Complexité narrative | Simple | Cérébral | 3 |

**Règles** :
- Skippable (valeurs par défaut appliquées)
- Définit le profil de base permanent

### Message si skip total
> "Sans tes préférences, les recommandations seront génériques au début. Elles s'affineront après quelques scrolls."

### Différence Onboarding vs Quiz Tonight

| | Onboarding | Quiz Tonight |
|---|------------|--------------|
| Quand | Une fois au début | À chaque session |
| But | Profil permanent | Mood du moment |
| Impact | Scoring du feed | Sélection Top 10 ponctuelle |
| Modifiable | Oui (settings) | Non (jetable) |

---

## 7. Groupe 2 : Feed BA

### Navigation
- **Swipe haut** = film suivant
- **Swipe bas** = film précédent
- Retour possible sur films déjà vus
- Changement d'avis possible

### Lecture vidéo
- Autoplay en arrivant sur le film
- Son activé par défaut
- Boucle automatique

### Actions (boutons à droite, style TikTok)

| Bouton | Icône | Action |
|--------|-------|--------|
| Like | ❤️ | Marquer comme intéressant |
| Dislike | ❌ | Pas intéressé |
| Watchlist | 🔖 | Sauvegarder pour plus tard |
| J'ai vu | ✓ | Marquer comme vu → notation |
| Info | ℹ️ | Ouvrir modale détail |

### Infos affichées
- Titre
- Tags (genres)
- Année
- Durée
- Note TMDB
- 2 acteurs principaux
- Plateformes disponibles (icônes)

### Modale "Voir plus"
- Image backdrop
- Titre, année, durée, note
- Tags genres
- Phrase IA : "Parce que tu as aimé..."
- Synopsis complet
- Casting complet
- Plateformes disponibles
- Boutons actions (like, watchlist, j'ai vu)

### Toggle plateformes
- Disponible dans le feed ou settings
- Pas dans l'onboarding
- Désactivé par défaut (découverte maximale)
- Si activé : filtre uniquement les films dispo sur mes plateformes

### Scoring du feed

| Axe | Poids |
|-----|-------|
| Match genres | 35% |
| Popularité | 15% |
| Fraîcheur | 15% |
| Qualité TMDB | 15% |
| Diversité temporelle | 10% |
| Diversité genre | 10% |

### Signaux collectés

| Signal | Poids |
|--------|-------|
| Watch Time (% BA regardée) | ⭐⭐⭐⭐⭐ |
| Skip rapide (< 3 sec) | ⭐⭐⭐⭐ négatif |
| Replay (scroll up) | ⭐⭐⭐⭐⭐ |
| Like | ⭐⭐⭐⭐ |
| Dislike | ⭐⭐⭐⭐ négatif |
| Watchlist | ⭐⭐⭐⭐⭐ |
| Ouvre détail | ⭐⭐⭐ |

### Technique
- MVP : Scoring à règles (pas de ML)
- V2+ : ML avec embeddings + collaborative filtering

---

## 8. Groupe 3 : Quiz Tonight

### Accès
- Onglet "Ce soir" dans la navigation du bas
- Peut être relancé plusieurs fois

### Format
- Question 1 : texte libre + choix rapides en fallback
- Questions 2-7 : choix multiples générés par l'IA
- Multi-sélection possible (sauf type et durée)
- 4-7 questions max selon richesse des réponses

### Dimensions à couvrir

| Dimension | Type | Exemples |
|-----------|------|----------|
| Mood | Multi | Rigoler, frissonner, réfléchir, s'évader, se poser |
| Type | Mono | Film, série, peu importe |
| Durée | Mono | Court, moyen, long, peu importe |
| Genre | Multi | Action, comédie, drame, horreur, etc. |
| Époque | Multi | Récent, classique, peu importe |
| Univers | Multi | Réaliste, SF, fantaisie, historique |
| Popularité | Multi | Blockbuster, pépite cachée |

### Comportement IA

**Règles strictes** :
1. Ne jamais assumer le contenu voulu
2. Clarifier ce qui est ambigu
3. Adapter la formulation au contexte
4. Analyser la réponse libre et déduire ce qu'elle peut
5. Poser uniquement les questions pour dimensions manquantes

### Schéma de pensée IA
```
1. Qu'est-ce que je SAIS ?
2. Qu'est-ce que je peux CONCLURE ? (jamais sur le contenu)
3. Qu'est-ce qui est AMBIGU ?
4. Formuler question avec options claires
5. Dimensions couvertes ? → Oui = Top 10 / Non = question suivante
```

### Exemple critique
```
User : "Journée horrible, besoin de décompresser"

❌ MAUVAIS : Assumer → "film apaisant"
✅ BON : Clarifier → "Pour décompresser tu préfères quoi ?"
  Options : [Rigoler] [Un truc qui bouge] [Quelque chose de doux] [M'évader]
```

### Résultats
- **Top 10** films/séries
- Affichage en feed vertical (identité TRAILR)
- BA autoplay
- Mêmes actions (like, dislike, watchlist, j'ai vu)
- Indicateur "1/10", "2/10"...
- Phrase IA personnalisée pour chaque film

### Edge cases
- "Je sais pas" partout → basé sur profil existant ou sélection équilibrée
- Pas de timeout

---

## 9. Groupe 4 : Suivi Visionnage

### Bouton "J'ai vu"
Présent sur :
- Feed (bouton action à droite)
- Fiche détaillée
- Watchlist

### Notation
- 1-5 étoiles
- **Optionnelle** mais recommandée
- Message : "Note pour améliorer tes recommandations"
- Pas de commentaire libre
- Modifiable après coup

### Modification
- Retirer un "vu" possible
- Modifier la note à tout moment

### Historique
- Stocké en base (pour l'algo)
- Pas d'interface dédiée pour le MVP

### Relances

| Règle | Valeur |
|-------|--------|
| Fréquence | Tous les 2 mois |
| Format | Notification push groupée |
| Contenu | "Tu as X films en attente — t'en as vu ?" |
| Max par film | 2 relances |
| Après 2 ignorées | Stop pour ce film |

### Flow relance
```
Notification : "Tu as 5 films en attente"
        ↓
User ouvre → Liste des films
        ↓
Pour chaque : [✓ Vu] [⏳ Pas encore]
        ↓
Si "Vu" → demande note
Si "Pas encore" → relance dans 2 mois (si < 2 relances)
```

---

## 10. Navigation

### Barre de navigation (bottom)

| Onglet | Icône | Fonction |
|--------|-------|----------|
| Feed | 🎬 | Découverte par swipe |
| Ce soir | 🌙 | Quiz Tonight |
| Watchlist | 🔖 | Films sauvegardés |
| Profil | 👤 | Settings, préférences |

### Écran Watchlist
- Liste des films sauvegardés
- Filtres : Tous / Films / Séries
- Actions : J'ai vu, Retirer
- Affichage : miniature + titre + année + plateforme

### Écran Profil
- Avatar + nom + mode (connecté/invité)
- Incitation création compte (si invité)
- Préférences : Plateformes, Genres, Calibrage mood
- Toggle "Filtrer mes plateformes"
- Statistiques : Likes, Watchlist, Vus
- Déconnexion

---

## 11. Utilisation de l'IA

### Répartition

| Fonction | Techno | Coût |
|----------|--------|------|
| Feed (scoring) | Algorithme règles | Gratuit |
| Quiz Tonight | GPT-4o mini | ~0.01€/quiz |
| Phrase "Parce que tu as aimé..." | GPT-4o mini | ~0.001€/phrase |

### Architecture sécurisée
```
App React Native → Supabase Edge Function → OpenAI API
                                         ↓
                        (clé API jamais exposée côté client)
```

---

## 12. Modèle de Données

### Tables Supabase

```sql
-- Utilisateurs
users (
  id UUID PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  is_guest BOOLEAN,
  created_at TIMESTAMP
)

-- Préférences
user_preferences (
  user_id UUID REFERENCES users,
  platforms TEXT[],
  genres TEXT[],
  mood_intensity INT,
  mood_pace INT,
  mood_tension INT,
  mood_complexity INT,
  filter_platforms BOOLEAN DEFAULT false
)

-- Films/Séries (cache TMDB)
movies (
  id INT PRIMARY KEY,
  title TEXT,
  type TEXT, -- 'movie' ou 'tv'
  year INT,
  duration INT,
  genres TEXT[],
  synopsis TEXT,
  poster_url TEXT,
  backdrop_url TEXT,
  tmdb_rating FLOAT,
  cast TEXT[],
  platforms TEXT[],
  trailer_youtube_id TEXT
)

-- Interactions
interactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  movie_id INT REFERENCES movies,
  type TEXT, -- 'like', 'dislike', 'watchlist', 'seen'
  rating INT,
  watch_percent INT,
  created_at TIMESTAMP
)

-- Relances
reminders (
  user_id UUID REFERENCES users,
  movie_id INT REFERENCES movies,
  count INT DEFAULT 0,
  next_at TIMESTAMP
)
```

---

## 13. Design System

### Couleurs
| Rôle | Valeur |
|------|--------|
| Background | `#050505` |
| Surface (glass) | `rgba(255,255,255,0.06)` |
| Accent | `#7c3aed` (violet) |
| Text Primary | `#FFFFFF` |
| Text Secondary | `rgba(255,255,255,0.4)` |

### Typographie
- **Font** : Montserrat
- **Weights** : 400, 600, 800

### Effets
- **Glassmorphism** : backdrop-blur + border subtle
- **Premium glow** : box-shadow violet sur boutons principaux
- **Cinematic gradient** : transparent → noir en bas des vidéos

---

## 14. Hors Scope MVP

| Feature | Version prévue |
|---------|----------------|
| Social (groupe, matchs, invités) | V1 |
| ML / embeddings | V2 |
| Collaborative filtering | V2 |
| Historique "films vus" | V1 |
| Promo avant-sortie | V2 |
| Expansion internationale | V2+ |
| Modèle économique | V1+ |

---

## 15. Roadmap MVP — 7 Semaines

### Semaine 1 : Setup & Infrastructure

| Jour | Tâches |
|------|--------|
| J1 | Créer comptes : GitHub, Expo, Supabase, TMDB, OpenAI |
| J2 | Init projet React Native + Expo |
| J3 | Configurer Supabase : Auth (Google, Apple) + tables |
| J4 | Tester Auth sur Expo Go |
| J5 | Setup Edge Function (test OpenAI) |

**Livrable** : Projet qui tourne sur téléphone avec auth fonctionnelle

---

### Semaine 2 : Authentification & Onboarding

| Jour | Tâches |
|------|--------|
| J1 | Écran Splash (design, animation) |
| J2 | Écran Connexion (Apple, Google, Invité) |
| J3 | Session persistante + routing conditionnel |
| J4 | Onboarding étape 1 (Plateformes) |
| J5 | Onboarding étape 2 (Genres) + étape 3 (Sliders) |

**Livrable** : Flow complet premier lancement → onboarding

---

### Semaine 3 : Catalogue & Sourcing BA

| Jour | Tâches |
|------|--------|
| J1 | Intégration TMDB API (films + séries FR) |
| J2 | Script import catalogue initial |
| J3 | Table mapping distributeurs → YouTube |
| J4 | Script recherche BA YouTube par titre |
| J5 | Stockage URLs + gestion indisponibilités |

**Livrable** : Base de ~500 films/séries avec BA

---

### Semaine 4 : Feed BA

| Jour | Tâches |
|------|--------|
| J1 | Composant vidéo YouTube (autoplay, boucle) |
| J2 | Layout feed vertical + scroll snap |
| J3 | Boutons actions (like, dislike, watchlist, j'ai vu) |
| J4 | Affichage infos film + modale détail |
| J5 | Algorithme scoring + stockage interactions |

**Livrable** : Feed fonctionnel avec vraies BA

---

### Semaine 5 : Quiz Tonight

| Jour | Tâches |
|------|--------|
| J1 | UI écran quiz (chat-like) |
| J2 | Input texte libre + options cliquables |
| J3 | Edge Function OpenAI (prompt system) |
| J4 | Génération questions dynamiques |
| J5 | Génération Top 10 + écran résultats |

**Livrable** : Quiz fonctionnel de bout en bout

---

### Semaine 6 : Suivi & Watchlist & Profil

| Jour | Tâches |
|------|--------|
| J1 | Écran Watchlist (liste, filtres, actions) |
| J2 | Bouton "J'ai vu" + modal notation |
| J3 | Système relances (logic + stockage) |
| J4 | Écran Profil (settings, stats) |
| J5 | Phrase IA "Parce que tu as aimé..." |

**Livrable** : Toutes les features MVP fonctionnelles

---

### Semaine 7 : Polish & Déploiement

| Jour | Tâches |
|------|--------|
| J1 | Tests sur devices (iOS + Android) |
| J2 | Bug fixes + optimisation performance |
| J3 | Créer comptes Apple Developer + Google Play |
| J4 | Build EAS (iOS + Android) + screenshots |
| J5 | Soumission stores |

**Livrable** : App soumise sur App Store et Google Play

---

### Résumé Roadmap

| Semaine | Focus | Livrable |
|---------|-------|----------|
| S1 | Setup | Projet + Auth |
| S2 | Auth + Onboarding | Flow premier lancement |
| S3 | Catalogue | 500 films avec BA |
| S4 | Feed BA | Feed fonctionnel |
| S5 | Quiz Tonight | Quiz IA complet |
| S6 | Suivi + Profil | Features complètes |
| S7 | Polish + Deploy | App sur les stores |

---

## 16. Métriques de Succès

| Métrique | Cible |
|----------|-------|
| Time-to-pick (Quiz) | < 2 min |
| Complétion onboarding | > 70% |
| Watchlist / session | > 2 films |
| Rétention J1 | > 40% |
| Rétention J7 | > 25% |

---

## 17. Checklist Lancement

### Avant soumission stores
- [ ] App fonctionne offline (mode dégradé)
- [ ] Gestion erreurs réseau
- [ ] Loading states partout
- [ ] Pas de crash
- [ ] Mentions légales présentes
- [ ] Politique de confidentialité (URL)
- [ ] Conditions d'utilisation (URL)

### Assets requis
**App Store** :
- Icône 1024x1024
- Screenshots iPhone (6.5" et 5.5")
- Description courte + longue
- Mots-clés

**Google Play** :
- Icône 512x512
- Feature graphic 1024x500
- Screenshots phone
- Description courte + longue

---

*Document généré le 4 février 2026*
*Version : MVP 1.0 — React Native + Expo*
