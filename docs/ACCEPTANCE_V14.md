# BeninPublio V14 — critères d’acceptation et état d’exécution

Ce tableau distingue ce qui existe dans le dépôt de ce qui a été confirmé en production. Un commit ou un contrôle de syntaxe ne constitue pas à lui seul une validation fonctionnelle.

| Parcours / règle V14 | État dans le dépôt | Validation / blocage restant |
|---|---|---|
| Catalogue public basé sur les données | Implémenté | Endpoints publics filtrent les vitrines actives et les contenus publiés ; déploiement Pages à confirmer |
| Vitrine par commerce | Implémenté | URL `?boutique=slug`, produits et actualités du commerce ; tester sur navigateur mobile |
| Panier et WhatsApp par commerce | Implémenté | Un panier ne peut mélanger plusieurs vitrines ; numéro issu de la vitrine ; l’envoi reste manuel |
| Espace commerçant : inscription, connexion, paramètres | Implémenté | Parcours navigateur complet à rejouer après déploiement |
| Création et publication de produits/posts | Implémenté | Publication refusée tant que la vitrine n’est pas active ; limites serveur au moment de publier |
| Upload d’images R2 | Implémenté dans le code | Vérification de signature JPEG/PNG/WebP, dimensions, quota et rattachement au tenant ; tests réels d’upload encore requis |
| Compression / EXIF | Partiellement implémenté | Compression/réencodage côté navigateur si supporté ; retrait EXIF JPEG côté Worker ; tests de fichiers adverses requis |
| Quotas Starter / PRO | Partiellement implémenté | Produits actifs, posts textuels/illustrés et stockage sont contrôlés à certains endpoints ; vérifier downgrade et tous les chemins de mutation |
| Reçus manuels imprimables | Implémenté dans le code | Totaux calculés côté serveur, lignes multiples, conservation proposée 90 jours ; revue juridique/fiscale non faite |
| Statistiques agrégées | Implémenté dans le code | Vues vitrine, vues produits, clics WhatsApp sur 30 jours ; déduplication bots à améliorer |
| Super-admin et abonnements | Implémenté dans le code | Bootstrap protégé par secret, essai 14 jours, activation manuelle 30 jours, suspension, plans et audit ; secret Worker à configurer |
| Expiration et réactivation | Partiel | Vitrines expirées filtrées des routes publiques ; suspension et rappel automatiques complets encore à construire |
| Catégories administrables | Partiel | CRUD global côté super-admin et catégories propres au commerçant ; la gestion structurée des secteurs et les migrations de catégories utilisées restent à compléter |
| Isolation multi-tenant | Partiel | Requêtes principales filtrées par tenant ; tests d’intrusion automatisés à ajouter |
| Sauvegarde / restauration | À faire | Procédure, rotation et restauration testée |
| Capacité pour 100 vitrines | À faire | Pas de test de charge ni mesure de capacité certifiée |
| CI syntaxe et contrat public | Réussi | Workflow GitHub Actions : contrôle JS et tests API publics passés sur le commit `8c7f5bc4` |
| Déploiement complet Pages + Worker | Bloqué par configuration | Le workflow saute le déploiement si `CLOUDFLARE_ACCOUNT_ID` et `CLOUDFLARE_API_TOKEN` sont absents des secrets GitHub |

## Décisions commerciales préservées

- Starter : 30 produits actifs, 1 image par produit, 12 posts illustrés, 30 posts textuels, 150 Mo.
- PRO : 70 produits actifs, 3 images par produit, 30 posts illustrés, 50 posts textuels, 250 Mo.
- Prix discutés : 5 500 et 11 300 FCFA/mois, à confirmer avant la vente.
- Paiement en ligne hors MVP ; paiement et activation validés manuellement.
- IA désactivée par défaut ; aucun appel IA au chargement public.
- Cible : pilote progressif avant 100 vitrines actives.

## Conditions avant pilote

1. Configurer les secrets de déploiement GitHub pour publier la version du dépôt.
2. Configurer `ADMIN_BOOTSTRAP_SECRET` côté Worker, créer le super-admin, puis retirer ce secret.
3. Rejouer inscription → configuration → activation → image → publication → vitrine publique → panier WhatsApp → reçu.
4. Tester deux comptes et confirmer qu’aucune donnée ou image ne peut être lue/modifiée depuis l’autre tenant.
5. Tester quotas, expiration, suspension, restauration, mobile et réseau lent.
6. N’ouvrir la commercialisation qu’après correction des défauts bloquants.
