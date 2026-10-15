# BeninPublio — Recette et état d'avancement V16

Dernière mise à jour : 14 octobre 2026. Le cahier des charges V16 est la source de vérité. Les déploiements Cloudflare sont confirmés par l'API de gestion, mais les tests complets de navigateur et d'isolation multi-tenant n'ont pas encore été exécutés.

## État des livrables

| Référence produit V16.1 | Document ajouté | `docs/REFERENCE_PRODUIT_V16_1.md` définit le parcours de commande, les modèles, la livraison administrée, l’authentification téléphone et les critères d’acceptation ; les fonctionnalités non réalisées y restent explicitement marquées comme à faire. |
| Connexion téléphone ou e-mail | Code adapté, recette à faire | L’API accepte désormais un identifiant téléphone ou e-mail et le formulaire commerçant l’annonce. Vérifier la normalisation avec numéros réels, l’unicité des téléphones et la non-régression des comptes e-mail avant de considérer le parcours validé. |
| Création/clonage de vitrines depuis l’administration | À faire | La console existante ne dispose pas encore de la bibliothèque de modèles ni du parcours sécurisé de clonage et de livraison ; ne pas présenter cette capacité comme disponible. |

| Exigence V16 | État | Preuve / point restant |
|---|---|---|
| Positionnement plateforme distinct des vitrines | Implémenté dans le code et déployé | `index.html` présente BeninPublio comme la plateforme ; `storefront.html` est le rendu individuel |
| Lien public propre à chaque vitrine | Implémenté et déployé | Route Pages `/b/*` réécrite vers `storefront.html` |
| Catalogue, actualités, panier WhatsApp par vitrine | Implémenté dans le code et déployé | Le frontend appelle les routes `/api/public/stores/:slug`, `/products` et `/posts` |
| Interdire le catalogue global public | Implémenté côté Worker et déployé | `/api/public/stores`, `/api/public/products`, `/api/public/posts` exigent désormais un slug via une erreur explicite |
| Logo de vitrine et QR code | Implémenté dans le code et déployé | Upload du logo via R2 ; QR code sur la vitrine et dans l'espace commerçant |
| Authentification commerçant | Présente | Tester en navigateur le cycle inscription/connexion/déconnexion et les cas d'erreur |
| Tenant déduit de la session | Présent dans les routes de gestion | Test d'intrusion automatisé à ajouter ; vérifier avec deux comptes en environnement de recette |
| Quotas Starter/PRO côté serveur | Partiellement implémenté | Limites de publication, images et stockage présentes ; downgrade à valider par scénarios automatisés |
| Contenus excédentaires désactivés sans suppression | Partiellement implémenté | À tester après downgrade, puis après upgrade ; les médias non utilisés ne doivent pas être supprimés automatiquement |
| Suspension à expiration | Partiellement implémenté | Le rendu public filtre les échéances ; les appels commerçant et la console super-admin traitent les expirations. Une tâche planifiée automatique reste à mettre en place |
| Console super-admin | Présente | Création initiale bloquée tant que `ADMIN_BOOTSTRAP_SECRET` n'est pas configuré ; tester activation, essai, suspension et modification des plans |
| Journal d'audit | Partiellement implémenté | Console et endpoint de lecture ajoutés ; vérifier que chaque action sensible est journalisée |
| Sauvegarde/restauration | À faire | Aucune sauvegarde hors site et aucune restauration testée n'ont été certifiées |
| IA facultative, validation humaine | IA désactivée | Aucun appel IA nécessaire au fonctionnement du MVP |
| Paiement en ligne | Hors MVP | Confirmation et activation manuelles uniquement |
| Test de charge 100 vitrines | À faire | Aucune capacité certifiée à 100 vitrines à ce jour |
| Recette mobile/réseau lent | À faire | Tester sur appareils réels et connexions lentes |
| Déploiement Worker V16 | Confirmé | Dernier déploiement `89a38c89-e440-4c96-8173-72af2d68a133` accepté avec D1/R2, `AI_ENABLED=false`, routes admin corrigées, garde d'authentification et rotation du mot de passe |
| Déploiement Pages V16 | Confirmé | Déploiement Direct Upload de production `1e15abc0-65a4-4ae2-a8ec-a6e4a1a51d06`, statut `success` |

## Référence V16.1

La nouvelle référence produit est conservée dans [docs/REFERENCE_PRODUIT_V16_1.md](REFERENCE_PRODUIT_V16_1.md). Elle complète V16 ; elle ne signifie pas que tous les éléments de la feuille de route sont déjà développés ou déployés.

## Intégration du brief design V1

- [x] Brief V1 conservé dans `docs/BeninPublio_Design_Brief_V1.md`.
- [x] Tokens de couleur, logo SVG et favicon intégrés au dépôt GitHub ; focus clavier et cibles tactiles améliorés.
- [x] Bouton mobile fixe « Commander via WhatsApp » ajouté au code de la vitrine ; il ouvre le panier et ne déclenche pas seul l’envoi du message.
- [x] Textes exacts de stockage proche/plein et de vitrine indisponible intégrés dans les surfaces concernées.
- [ ] Les maquettes haute-fidélité des huit écrans ne sont pas incluses dans le ZIP fourni ; elles restent à produire.
- [x] Nouveau déploiement Pages production effectué via le workflow GitHub Actions ; le Worker et les 11 fichiers statiques, plus `_headers` et `_redirects`, ont été publiés avec succès. Le workflow prépare maintenant aussi le logo et le favicon dans `assets/`.
- [x] Le workflow de déploiement automatique est opérationnel ; les tests API et contrat V16 ont réussi sur le dernier run.
- [ ] Validation visuelle sur vrais appareils et recette navigateur restent à faire.

## Contrôles manuels obligatoires avant pilote

1. Configurer `ADMIN_BOOTSTRAP_SECRET` dans les secrets du Worker, créer le super-admin puis retirer le secret.
2. Tester deux comptes commerçants : aucune donnée, image, reçu ou statistique ne doit être accessible depuis l'autre compte.
3. Tester Starter : 30 produits, 1 image par produit, 12 posts illustrés, 30 textuels, 150 Mo.
4. Tester PRO : 70 produits, 3 images par produit, 30 posts illustrés, 50 textuels, 250 Mo.
5. Tester le downgrade : conserver les contenus excédentaires en les désactivant ; ne jamais supprimer automatiquement un média encore utilisé.
6. Tester expiration, suspension publique et commerçant, réactivation et journalisation.
7. Tester logo, compression d'image, QR, lien public, recherche, panier à commerce unique et message WhatsApp.
8. Exporter D1, conserver une sauvegarde hors site, puis prouver qu'une restauration fonctionne avant le pilote.
9. Effectuer une recette mobile, réseau lent et charge avant d'ouvrir la plateforme à 100 vitrines.

## Décisions V16

- Starter : 30 produits, 1 image/produit, 12 posts illustrés, 30 posts textuels, 150 Mo.
- PRO : 70 produits, 3 images/produit, 30 posts illustrés, 50 posts textuels, 250 Mo.
- Prix indicatifs à valider : 5 500 et 11 300 FCFA/mois.
- WhatsApp : message prérempli, envoi manuel par le visiteur.
- Paiement en ligne et envoi automatisé WhatsApp : hors MVP.
- Toute fonction essentielle doit fonctionner sans IA.
