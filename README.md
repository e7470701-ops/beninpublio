# BeninPublio

**Achetez • Vendez • Grandissez** — Votre commerce en ligne, simplement au Bénin.

## Source de vérité

- Référence produit V16.2 (création administrée, offres Simple/Starter/PRO, recherche catalogue, IA PRO, statistiques et livraison) : [docs/REFERENCE_PRODUIT_V16_1.md](docs/REFERENCE_PRODUIT_V16_1.md). Les capacités non implémentées y restent marquées comme à faire.

Le cahier des charges fonctionnel et technique **V16 du 14 octobre 2026** remplace les documents antérieurs pour les nouvelles décisions. BeninPublio est la plateforme SaaS qui crée, héberge et gère des vitrines individuelles. Chaque commerçant gère uniquement sa vitrine ; le visiteur final voit uniquement la page publique de ce commerce.

## Environnements

- Plateforme BeninPublio : https://beninpublio.pages.dev
- Exemple de route vitrine : https://beninpublio.pages.dev/b/nom-du-commerce
- Espace commerçant : https://beninpublio.pages.dev/merchant.html
- Console super-admin : https://beninpublio.pages.dev/admin.html
- API Worker : https://beninpublio-api.e7470701.workers.dev

## Architecture

- Cloudflare Pages : interface plateforme et vitrines publiques
- Cloudflare Workers : API, authentification, permissions et règles métier
- D1 `beninpublio-db` : données relationnelles multi-tenant
- R2 `beninpublio-media` : images et médias privés servis uniquement s'ils sont publiables

## Comportement V16 implémenté

- Page d'accueil présentant BeninPublio comme plateforme, et non comme une boutique collective.
- Vitrine individuelle par slug via `/b/<slug>`, avec produits, actualités, contacts, panier et QR code.
- API de catalogue par vitrine : les anciennes routes de liste globale des produits, posts et commerces renvoient une erreur et ne doivent pas être utilisées.
- Espace commerçant avec inscription, connexion, profil, produits, posts, médias, stats et reçus.
- Upload image avec validation du format, dimensions, retrait EXIF JPEG, quota de stockage et compression côté navigateur.
- Logo de vitrine stocké dans R2, métadonnées dans D1.
- Règles serveur Starter/PRO et limites de stockage de 150 Mo / 250 Mo.
- Console super-admin pour activer/suspendre les vitrines, accorder les essais et gérer les plans ; affichage du journal d'audit récent.
- WhatsApp : message prérempli, envoi déclenché par le visiteur et confirmation manuelle du commerçant.
- IA désactivée ; aucun paiement en ligne intégré dans le MVP.

## Design V1 intégré

Le brief fourni est conservé dans [docs/BeninPublio_Design_Brief_V1.md](docs/BeninPublio_Design_Brief_V1.md) et son système de design dans [docs/DESIGN_SYSTEM_V1.md](docs/DESIGN_SYSTEM_V1.md). Le dépôt comprend désormais un logo SVG, un favicon, des états de focus clavier visibles, des cibles tactiles adaptées et un bouton mobile fixe « Commander via WhatsApp » sur les vitrines. Les maquettes haute-fidélité mentionnées dans le brief ne figuraient pas dans l’archive reçue ; elles ne sont donc pas présentées comme livrées.

## Limites V16 encore à valider

Le déploiement technique n'est pas équivalent à une recette de production. Avant un pilote commercial, il reste à valider le parcours complet dans un navigateur réel, l'isolation avec deux comptes, les règles de downgrade/restauration des contenus, les scénarios d'expiration, les sauvegardes et une restauration réellement testée, la charge à 100 vitrines, le mobile et les réseaux lents. Voir [docs/ACCEPTANCE_V16.md](docs/ACCEPTANCE_V16.md).

## Déploiement

- Le Worker `beninpublio-api` est déployé sur Cloudflare et lié à D1/R2 ; `AI_ENABLED=false`.
- Le projet Pages est en Direct Upload. Le workflow `.github/workflows/deploy-pages.yml` prépare les fichiers publics complets, y compris la vitrine, `_headers`, `_redirects` et `assets/`, puis déploie Worker et Pages après validation.
- Le workflow utilise le secret GitHub Actions `CLOUDFLARE_API_TOKEN` ; l'identifiant de compte Cloudflare est configuré dans le workflow. Le dernier déploiement automatisé Worker + Pages a réussi.
- Le schéma initial V16 est décrit dans `db/migrations/0001_initial.sql`; les modifications de production sont documentées dans `db/migrations/0002_v16_storefront.sql`.

## Formules de référence V16.2

| Fonctionnalité | Simple | Starter | PRO |
|---|---:|---:|---:|
| Prix mensuel | 2 700 FCFA | 5 500 FCFA | 11 300 FCFA |
| Produits actifs | 30 | 75 | 130 |
| Images par produit | 1 | 1 | 3 |
| Stockage indicatif | 50 Mo | 150 Mo | 250 Mo |
| Recherche intelligente catalogue | Non | Oui | Oui |
| IA avancée | Non | Non | Oui |
| Statistiques avancées / export CSV | Non | Non | Oui |

Les quotas de publications V16 restent provisoirement inchangés dans la migration V16.2 ; le quota Simple est à valider. La migration `db/migrations/0003_v16_2_plan_tiers.sql` doit être appliquée à D1 avant que les nouvelles limites soient considérées actives en production. Les fonctions IA restent indisponibles tant que `AI_ENABLED=false`.
