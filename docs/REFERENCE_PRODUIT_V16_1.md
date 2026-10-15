# BeninPublio — Référence produit et plan d’application V16.2

Date : 15 octobre 2026  
Statut : référence produit mise à jour selon les décisions du 15 octobre 2026.  
Base : architecture V16 existante dans ce dépôt. Ce document complète V16 sans effacer ses règles de sécurité et de quotas.

## 1. Vision du produit

BeninPublio est une plateforme qui permet à l’équipe BeninPublio de préparer et livrer des vitrines individuelles aux commerçants. Le commerçant n’a pas à programmer ni à reconstruire sa page : il reçoit une vitrine configurée à partir d’un modèle prédéfini, puis gère lui-même ses produits et les informations autorisées depuis son espace.

Le système doit rendre la livraison répétable par formulaires et actions d’administration, sans modifier manuellement le code pour chaque client.

## 2. Les trois espaces distincts

### 2.1 Page d’accueil publique — `index.html`

Objectif : présenter BeninPublio comme plateforme, ses services, les offres, les modèles disponibles et le fonctionnement réel.

Éléments attendus :
- Présentation claire de la plateforme, pas d’une boutique collective.
- Services : vitrine individuelle, catalogue, WhatsApp, QR code, statistiques et gestion autonome.
- Galerie de modèles réellement disponibles, avec aperçu et type d’activité.
- Trois offres : Simple (2 700 FCFA/mois), Starter (5 500 FCFA/mois) et PRO (11 300 FCFA/mois), selon les quotas du tableau de la section 5. Ces tarifs sont les prix de référence communiqués par le propriétaire du projet.
- Parcours réel : le commerçant contacte BeninPublio, l’équipe prépare la vitrine, puis livre les accès ; le commerçant peut ensuite se connecter et gérer ses contenus.
- CTA « Commander ma vitrine sur WhatsApp » et CTA « Espace commerçant » bien distincts.
- Navigation simple entre l’accueil et l’espace commerçant.
- Mobile-first, accessibilité clavier, contrastes et chargement raisonnable.

### 2.2 Espace commerçant — `merchant.html`, `merchant.js`

Parcours cible :
1. Le commerçant clique sur « Espace commerçant ».
2. Il saisit le numéro de téléphone/WhatsApp enregistré et son mot de passe temporaire.
3. À la première connexion, il est invité à remplacer ce mot de passe.
4. Il gère uniquement sa vitrine : profil, logo, produits, images, actualités et statistiques autorisés par sa formule.
5. Un lien visible le ramène à l’accueil de BeninPublio sans supprimer sa session.

Important : le frontend actuel et l’API utilisent encore l’e-mail pour la connexion. La connexion téléphone ne doit être activée qu’en coordination avec l’API, la normalisation des numéros, l’unicité D1, les limites de tentatives et les tests de non-régression. Ne jamais modifier seulement le formulaire côté navigateur.

### 2.3 Console d’administration — `admin.html`, `admin.js`

Objectif : piloter l’activité sans code par client.

Parcours cible :
1. Enregistrer la demande et les coordonnées du client.
2. Choisir un modèle prédéfini publié dans la bibliothèque.
3. Saisir les données du commerce : nom, description, secteur, contacts, logo, images, couleurs si prévues et contenus initiaux.
4. Prévisualiser le résultat et confirmer la livraison.
5. Créer le compte et la vitrine à partir d’un modèle, sans modifier l’original.
6. Générer un lien public et préparer un message WhatsApp de livraison contenant l’URL et l’identifiant. Le mot de passe temporaire doit être communiqué une seule fois par un canal approprié, ne jamais être enregistré en clair dans les journaux et doit être changé à la première connexion.
7. Activer, suspendre et réactiver l’accès sans supprimer les données.
8. Voir l’historique des opérations dans le journal d’audit.

L’envoi WhatsApp automatisé n’est pas inclus dans le MVP : l’administration prépare un lien/message à copier ou ouvrir, et l’opérateur envoie manuellement.

## 3. Bibliothèque de modèles

Un modèle est un point de départ versionné, pas seulement une image. Il décrit une mise en page et les champs configurables (logo, nom, textes, couleurs, photos, coordonnées et sections activables).

Modèles initiaux à réaliser :
- Boutique/commerce : catalogue, prix, images, panier WhatsApp.
- Restaurant/menu : catégories de plats, prix, images et commande WhatsApp.
- Services/prestations : liste des prestations et coordonnées, seulement après validation du périmètre.

Règles :
- Les modèles publiés sont réutilisables et non modifiés par la personnalisation d’un client.
- Chaque livraison conserve la référence et la version du modèle choisi.
- La personnalisation doit être pilotée par des données validées, jamais par injection de HTML arbitraire.
- Les médias de modèle et les médias du client doivent être séparés clairement.
- Les modèles affichés sur l’accueil doivent être effectivement disponibles dans la bibliothèque, ou porter explicitement la mention « aperçu ».

## 4. Données et sécurité

- Le tenant est toujours dérivé de la session vérifiée côté serveur.
- Chaque requête d’administration exige une session super-admin et une vérification de rôle avant lecture ou mutation.
- Un commerçant ne peut pas consulter ou modifier le tenant d’un autre.
- Les mots de passe sont hachés côté serveur ; jamais en clair dans D1, le dépôt, les journaux ou les paramètres d’URL.
- Les numéros de téléphone sont normalisés au format international et uniques lorsqu’ils servent d’identifiant.
- Limiter les tentatives de connexion et bootstrap.
- Les actions de création, clonage, activation, suspension, réactivation, changement de modèle et changement d’accès sont auditées.
- La suspension bloque la gestion et suit une règle explicite pour l’accès public ; elle ne supprime pas les données.
- Toute création de vitrine et de compte doit être atomique ou disposer d’une compensation en cas d’échec.
- Aucun secret ni mot de passe de client ne doit être commité.

## 5. Offres commerciales et limites à appliquer

| Fonctionnalité | Simple | Starter | PRO |
|---|---:|---:|---:|
| Prix mensuel | 2 700 FCFA | 5 500 FCFA | 11 300 FCFA |
| Produits actifs maximum | 30 | 75 | 130 |
| Images par produit | 1 | 1 | 3 |
| Stockage par vitrine (indicatif) | 50 Mo | 150 Mo | 250 Mo |
| Boutique publique | Oui | Oui | Oui |
| Commandes WhatsApp | Oui | Oui | Oui |
| Recherche intelligente dans le catalogue | Non | Oui | Oui |
| IA avancée avec quotas supérieurs | Non | Non | Oui |
| Gestion du catalogue | Oui | Oui | Oui |
| Statistiques de base | À définir | Oui | Oui |
| Statistiques avancées | Non | Non | Oui |
| Export CSV | Non | Non | Oui |

Les quotas de publications illustrées/textuelles V16 (12/30 pour Starter et 30/50 pour PRO) restent inchangés provisoirement, car aucune nouvelle limite n’a été donnée pour ces deux types de contenu. Le nombre de publications autorisées en Simple reste à préciser. Les tailles de stockage sont indicatives et doivent être validées par mesure réelle du stockage et par tests de limites.

### Comportement attendu des fonctionnalités
- La recherche simple actuelle dans la vitrine ne doit pas être présentée comme une IA. Starter et PRO auront une recherche catalogue plus intelligente, par exemple tolérance aux variantes de saisie et recherche combinant nom, description et catégorie. Les détails exacts et les quotas de calcul sont à spécifier et tester.
- L’IA avancée est réservée à PRO. Les quotas doivent être appliqués côté serveur et visibles pour l’administrateur et le commerçant. Tant que `AI_ENABLED=false` et qu’aucun fournisseur n’est configuré, l’IA n’est pas disponible en production : l’interface ne doit pas prétendre le contraire.
- La priorité d’utilisation des fournisseurs gratuits, puis le budget payant plafonné, doit être mise en place avec une limite de coût et des journaux d’usage sans données sensibles.
- Les statistiques distinguent : visite de boutique, clic WhatsApp et commande suivie dans BeninPublio. Un clic WhatsApp n’est pas une commande confirmée.
- Pour suivre les commandes invalidées, il faut enregistrer les demandes et leurs statuts (« En attente », « Validée », « Invalidée »). Le statut ne peut pas être deviné à partir d’un clic externe WhatsApp.
- L’export CSV et les statistiques avancées sont réservés à PRO.
- Paiement en ligne reste hors MVP ; les commandes clients utilisent WhatsApp et confirmation manuelle.

## 6. Plan d’application par étapes

### Étape A — Référence et UX
- [x] Consigner cette vision et les parcours cibles.
- [ ] Aligner les textes de la page d’accueil sur la livraison réelle administrée.
- [ ] Ajouter un CTA WhatsApp de commande avec message prérempli.
- [ ] Ajouter un lien de retour vers l’accueil dans l’espace commerçant.
- [ ] Afficher les modèles réellement disponibles, en distinguant modèles fonctionnels et aperçus.
- [ ] Afficher les trois offres Simple, Starter et PRO avec prix et quotas corrects.
- [ ] Séparer la recherche catalogue Starter/PRO de l’IA avancée PRO.

### Étape B — Bibliothèque de modèles
- [ ] Définir le schéma D1 pour modèles, versions, champs configurables et statut.
- [ ] Créer un modèle boutique fonctionnel et un modèle restaurant fonctionnel.
- [ ] Ajouter aperçu responsive et validation des champs.
- [ ] Écrire des tests de non-régression et d’isolation des médias.

### Étape C — Production de vitrines depuis l’administration
- [ ] Ajouter formulaire de demande/client et sélection de modèle.
- [ ] Ajouter création serveur de compte + vitrine + données de départ.
- [ ] Garantir l’atomicité, l’audit, les quotas et l’absence de modification du modèle source.
- [ ] Prévisualiser avant activation/livraison.
- [ ] Générer les instructions de livraison WhatsApp sans journaliser le secret temporaire.

### Étape D — Connexion par téléphone
- [ ] Adapter l’API d’authentification en premier (et non uniquement le HTML).
- [ ] Normaliser et valider les numéros béninois/internationaux, gérer l’unicité et les changements de numéro.
- [ ] Prévoir changement obligatoire du mot de passe temporaire à la première connexion.
- [ ] Garder une migration compatible avec les comptes e-mail existants jusqu’à ce que la stratégie de transition soit testée.
- [ ] Tester verrouillage/rate limit, erreurs, sessions et révocation.

### Étape E — Recette et déploiement
- [ ] Tests automatisés des routes et schémas.
- [ ] Test navigateur complet : commande → création admin → livraison → connexion commerçant → édition → page publique.
- [ ] Test avec deux tenants pour prouver l’isolation.
- [ ] Tester suspension/réactivation, expiration, downgrade et conservation des médias.
- [ ] Vérifier le rendu mobile et les réseaux lents.
- [ ] Déployer Worker et Pages via le workflow de déploiement du dépôt, puis vérifier le résultat en production.

## 7. Critères d’acceptation

La fonctionnalité n’est pas considérée terminée tant que :
1. Un administrateur peut créer une vitrine à partir d’un modèle via l’interface.
2. Le modèle source reste inchangé.
3. La vitrine publique affiche les données et images du bon commerçant.
4. Le commerçant se connecte avec l’identifiant officiellement retenu, change son mot de passe temporaire et gère ses données.
5. Un autre commerçant ne peut accéder à aucune donnée du premier.
6. L’administrateur peut suspendre puis réactiver le compte sans perte de données.
7. Les quotas et le journal d’audit sont appliqués.
8. Le parcours a été testé en navigateur réel et le déploiement est vérifié.

## 8. État initial constaté lors de la rédaction

- Le dépôt contient déjà la page d’accueil, la vitrine individuelle, le portail commerçant, la console super-admin, l’API Worker, D1/R2 et les règles de quota V16.
- La connexion actuelle est basée sur l’e-mail.
- La console d’administration existante gère les plans, états et catégories, mais ne contient pas encore le parcours de bibliothèque de modèles et de clonage.
- La route d’inscription publique existe. Elle devra être revue pour le modèle de vente administré : le produit doit décider si l’auto-inscription est conservée, désactivée ou réservée à un mode distinct, sans casser les comptes existants.
- Les visuels de modèles sont des illustrations de présentation tant que les modèles fonctionnels ne sont pas implémentés.
- L’état du dépôt ou un déploiement réussi ne remplace pas les tests d’intégration et de navigateur.

Ce document complète V16 comme référence de la prochaine évolution. Toute divergence entre l’interface, l’API, la base et ce parcours doit être résolue par une modification coordonnée et testée.


## 9. Décisions V16.2 du 15 octobre 2026

- La plateforme est un service accompagné de création de boutiques : l’équipe configure initialement la vitrine, puis le commerçant gère son catalogue.
- Les offres Simple, Starter et PRO et leurs prix/quotas produits sont ceux du tableau de la section 5.
- Les capacités de recherche intelligente Starter/PRO et l’IA avancée PRO sont des objectifs produit ; elles ne sont pas considérées disponibles avant leur implémentation et leur validation en production.
- Les statistiques doivent différencier visites, clics WhatsApp et commandes suivies avec statut. Les commandes invalidées nécessitent un enregistrement explicite dans BeninPublio.
- Les quotas de publications existants restent inchangés provisoirement ; le quota Simple et les détails précis de la recherche intelligente et des quotas IA restent à définir.
