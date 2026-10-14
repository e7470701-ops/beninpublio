# Mise en service du super-admin

Le fichier `admin.html` fournit la console de gestion des vitrines, essais, abonnements et formules. La création du premier super-admin est volontairement protégée par un secret serveur à usage unique.

## 1. Configurer la clé de bootstrap

1. Ouvre le tableau de bord Cloudflare.
2. Va dans **Workers & Pages** puis dans le Worker **beninpublio-api**.
3. Ouvre **Settings → Variables and Secrets**.
4. Ajoute un secret nommé exactement `ADMIN_BOOTSTRAP_SECRET`.
5. Utilise une valeur aléatoire d'au moins 32 caractères. Ne la place jamais dans Git, dans un fichier frontend ou dans une capture d'écran.

## 2. Créer le super-admin

1. Ouvre `https://beninpublio.pages.dev/admin.html` après le déploiement de la version qui contient la console.
2. Dans « Initialiser le super-admin », saisis la clé configurée côté Worker, l'adresse e-mail d'administration et un mot de passe d'au moins 14 caractères.
3. L'initialisation n'est acceptée que si aucun super-admin n'existe déjà.
4. Après la création, supprime le secret `ADMIN_BOOTSTRAP_SECRET` dans Cloudflare. Le compte administrateur continue de fonctionner ; la route de bootstrap ne sera plus disponible.

## 3. Utiliser la console

- **Accorder un essai** : active la vitrine pour 14 jours avec le statut d'abonnement « essai ».
- **Activer après paiement** : à utiliser uniquement après vérification manuelle du paiement ; active pour 30 jours.
- **Suspendre** : bloque la vitrine et journalise le motif.
- **Formules** : les tarifs et limites sont modifiables par le super-admin. Les prix discutés dans V14 restent à confirmer avant commercialisation.

Les actions administratives sont journalisées. Les paiements en ligne ne sont pas implémentés.

## 4. Déploiements depuis GitHub

Le workflow `.github/workflows/deploy-pages.yml` exécute les contrôles de syntaxe et les tests de contrat de l'API. Pour autoriser le déploiement automatique de Pages et du Worker après les tests, configure les secrets de dépôt GitHub `CLOUDFLARE_ACCOUNT_ID` et `CLOUDFLARE_API_TOKEN` avec les permissions Cloudflare minimales nécessaires.

Sans ces secrets, le workflow valide le code mais ignore le déploiement. Le secret de bootstrap du super-admin est distinct et doit rester uniquement dans les secrets du Worker.
