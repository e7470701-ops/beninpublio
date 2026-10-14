# BeninPublio
**Achetez • Vendez • Grandissez** — Votre commerce en ligne, simplement au Bénin.

## Environnements
- Site public : https://beninpublio.pages.dev
- Espace commerçant : https://beninpublio.pages.dev/merchant.html
- API Worker : https://beninpublio-api.e7470701.workers.dev
- Santé API : https://beninpublio-api.e7470701.workers.dev/api/health

## Ressources Cloudflare créées
- Pages : `beninpublio`
- Worker : `beninpublio-api`
- D1 : `beninpublio-db` (schéma initial appliqué)
- R2 : `beninpublio-media` (bucket privé, liaison Worker configurée)

## Fonctionnalités en place
- Vitrine responsive et catalogue de démonstration.
- Panier local et préparation d'un message WhatsApp que le visiteur doit confirmer lui-même.
- Espace commerçant : inscription, connexion, déconnexion, édition des informations de vitrine, création de produits et publications en brouillon.
- API avec mots de passe PBKDF2, jetons de session aléatoires dont seul le hash est stocké, limitation de fréquence et journal d'audit partiel.
- Requêtes de catalogue filtrées par vitrine (tenant) et limites de produits par formule.
- Plans Starter/PRO dans D1 et limites de stockage de 150 Mo / 250 Mo conservées.

## Limites importantes
Ce projet est en phase d'implémentation et n'est pas encore prêt pour une commercialisation publique. Les vitrines sont créées en brouillon ; le parcours d'activation administrateur et les abonnements ne sont pas terminés. Les uploads R2 avec contrôles MIME/EXIF/quota, le tableau de bord super-admin, les reçus, les statistiques, les tests automatisés d'isolation, la sauvegarde/restauration et la vérification juridique restent à réaliser. L'IA et les paiements en ligne sont désactivés.

## Déploiement automatique
Cloudflare Pages est relié à GitHub : les commits sur `main` déclenchent automatiquement le déploiement de la vitrine. Le workflow GitHub Actions déploie le Worker API lorsque les secrets `CLOUDFLARE_ACCOUNT_ID` et `CLOUDFLARE_API_TOKEN` sont configurés ; sans eux, l'étape Worker est ignorée sans faire échouer le workflow. Le Worker est déjà déployé directement dans Cloudflare.

## Décisions V14 préservées
- Starter : 30 produits, 12 posts illustrés, 30 posts texte, 150 Mo.
- PRO : 70 produits, 30 posts illustrés, 50 posts texte, 250 Mo.
- Tarifs évoqués, à confirmer avant commercialisation : 5 500 et 11 300 FCFA/mois.
- WhatsApp : le visiteur confirme lui-même l'envoi.
- IA facultative, désactivée par défaut, brouillons soumis à validation humaine, budgets plafonnés avant activation.
- Paiements en ligne hors MVP.
- Cible de capacité : 100 vitrines actives après pilote et tests de charge ; ce n'est pas encore une capacité certifiée.
