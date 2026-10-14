# BeninPublio API — état d'exécution

Base URL de l'API : https://beninpublio-api.e7470701.workers.dev

## Routes implémentées
- GET /api/health — état de l'API et de D1.
- POST /api/auth/register — crée un compte commerçant et une vitrine en brouillon.
- POST /api/auth/login — connexion et création d'une session bearer.
- POST /api/auth/logout — révoque la session courante.
- GET /api/me — profil et vitrines du compte.
- GET/PATCH /api/store — lire ou modifier la vitrine du commerçant connecté.
- GET/POST /api/products — lister ou créer des produits en brouillon.
- PATCH/DELETE /api/products/:id — modifier/supprimer uniquement un produit appartenant à la vitrine du compte.
- GET/POST /api/posts — lister/créer des publications en brouillon.
- GET /api/public/stores/:slug — vitrine active publique.
- GET /api/public/stores/:slug/products — catalogue publié.
- GET /api/public/stores/:slug/posts — publications visibles.

## Sécurité déjà codée
- Mots de passe dérivés avec PBKDF2-HMAC-SHA-256 (210 000 itérations) et sel aléatoire.
- Jetons de session aléatoires ; seul leur hash SHA-256 est conservé dans D1 ; expiration à 7 jours.
- Requêtes SQL préparées et filtrage par tenant sur les objets de catalogue.
- Limitation de fréquence simple pour l'inscription et la connexion.
- Limite de corps JSON, contrôles de champs, journaux d'audit pour certaines opérations.
- Aucun compte super-admin par défaut ; aucune route publique d'activation de vitrine.
- IA désactivée par défaut. Les opérations de paiement en ligne ne sont pas implémentées.

## Points bloquants avant un pilote réel
1. Construire l'interface de connexion et le tableau de bord commerçant.
2. Mettre en place l'amorçage contrôlé du super-admin et les transitions d'abonnement/activation.
3. Ajouter les uploads R2 avec vérification MIME, taille, quotas et suppression EXIF.
4. Compléter CRUD des publications, catégories, reçus, statistiques et console d'administration.
5. Ajouter des tests automatisés, dont tests d'accès croisé entre deux vitrines, et exécuter un vrai test HTTP sur l'URL de production.
6. Configurer les secrets GitHub Actions `CLOUDFLARE_ACCOUNT_ID` et `CLOUDFLARE_API_TOKEN` pour les prochains déploiements automatiques.
7. Vérifier les politiques de confidentialité, la conservation des données et les coûts avant ouverture publique.

## Limites produit
- Starter : 30 produits, 12 publications illustrées, 30 publications texte, 150 Mo.
- PRO : 70 produits, 30 publications illustrées, 50 publications texte, 250 Mo.
- Prix de départ notés dans le cahier : Starter 5 500 FCFA/mois, PRO 11 300 FCFA/mois, à valider avant commercialisation.
