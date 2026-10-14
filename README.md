# BeninPublio
**Achetez • Vendez • Grandissez** — Votre commerce en ligne, simplement au Bénin.

Ce dépôt démarre le socle du produit décrit dans le cahier des charges V14.

## Architecture cible
- Frontend responsive et mobile-first
- Cloudflare Workers : API et règles métier
- Cloudflare D1 : données relationnelles
- Cloudflare R2 : médias, quotas Starter 150 Mo / PRO 250 Mo
- GitHub : versionnage et déploiements continus

## Statut
Le dépôt commence par une vitrine de démonstration. L'authentification sécurisée, les permissions multi-tenant, les opérations D1/R2, les abonnements, les reçus et les garde-fous IA doivent être implémentés et testés avant de traiter des données réelles ou d'ouvrir le service en production.

## Démarrage
Ouvrir `index.html` directement dans un navigateur ou servir ce dossier avec un serveur statique.

## Décisions V14 préservées
- Starter : 30 produits, 12 posts illustrés, 30 posts texte, 150 Mo.
- PRO : 70 produits, 30 posts illustrés, 50 posts texte, 250 Mo.
- Tarifs évoqués, à confirmer : 5 500 et 11 300 FCFA/mois.
- WhatsApp : le visiteur confirme lui-même l'envoi.
- IA facultative, brouillons soumis à validation humaine, budgets plafonnés.
- Paiements en ligne hors MVP.
