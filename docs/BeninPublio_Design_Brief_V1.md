# BENINPUBLIO — BRIEF DE DESIGN COMPLET
**Version 1.0 — 14 octobre 2026**

## 1. Positionnement clair (à ne jamais oublier)

**BeninPublio n’est PAS la boutique du commerçant. BeninPublio EST l’application / la plateforme qui FOURNIT les vitrines aux commerçants.**

| Élément | Nature | Qui l’utilise / le voit |
|---|---|---|
| BeninPublio | La plateforme (application) | Super-admin + Commerçants |
| Vitrine / Boutique du commerçant | Page publique générée par BeninPublio | Visiteurs / Acheteurs finaux |
| Espace Commerçant | Interface de gestion fournie par BeninPublio | Le commerçant uniquement |
| Console Super-Admin | Pilotage de toute la plateforme | Super-admin uniquement |

## 2. Identité visuelle

### Couleurs officielles
| Nom | Code Hex | Usage principal |
|---|---|---|
| Vert Principal | `#075B35` | Headers, boutons principaux, sidebar, logo |
| Orange Accent | `#F07818` | CTA, boutons secondaires, highlights |
| Jaune | `#F5C400` | Accents légers, badges |
| Blanc | `#FFFFFF` | Fonds principaux |
| Gris clair | `#F5F5F5` | Fonds secondaires, cartes |
| Texte principal | `#333333` | Corps de texte |
| Texte secondaire | `#666666` | Labels, placeholders |

Typographie : titres sans-serif moderne et gras (Inter, Poppins ou system-ui) ; corps lisible (Inter ou system-ui). Le nom de marque « BeninPublio » est en gras, avec « Benin » en vert et « Publio » en orange.

Logo souhaité : sac de shopping vert + smartphone avec motif géométrique orange ; silhouette légère de la carte du Bénin optionnelle. Déclinaisons souhaitées : complète, monochrome, favicon et icône PWA.

## 3. Visuels à produire / utiliser

1. **Logo principal** — header de toutes les pages plateforme, favicon, icône PWA, emails ; minimaliste, professionnel et moderne ; sac + smartphone + nom BeninPublio.
2. **Vitrine publique mobile** — header commerçant, catégories, grille produits et bouton « Commander via WhatsApp » fixe en bas ; l’acheteur ne voit que la vitrine du commerçant.
3. **Vitrine publique desktop** — sidebar catégories, grille produits et header propre.
4. **Tableau de bord commerçant** — stats Visites, Clics WhatsApp, Commandes, Stockage ; graphique, commandes récentes et bouton « Ajouter un produit ».
5. **Gestion des produits** — liste/tableau, quota visible (ex. 12/30), bouton « Nouveau produit », actions modifier/supprimer.
6. **Console Super-Admin** — toutes les vitrines (Nom, Secteur, Formule, Statut, Expiration), statistiques globales et filtres.
7. **Panier + WhatsApp** — articles, total, grand bouton « Commander via WhatsApp » et mention de confirmation par le commerçant.
8. **Connexion** — logo, Email/Téléphone, mot de passe, bouton « Se connecter » et lien de mot de passe oublié.

## 4. Emplacement et priorité

| ID | Visuel | Emplacement | Priorité |
|---|---|---|---|
| 01 | Logo | Header global, favicon, PWA, emails, documents | Critique |
| 02 | Vitrine mobile | Pages publiques commerçants | Critique |
| 03 | Vitrine desktop | Pages publiques commerçants | Haute |
| 04 | Dashboard commerçant | `/commercant/dashboard` | Critique |
| 05 | Gestion produits | `/commercant/produits` | Critique |
| 06 | Super-Admin | `/admin/vitrines` | Haute |
| 07 | Panier + WhatsApp | Modal panier vitrine publique | Critique |
| 08 | Connexion | `/login` | Critique |

Phase 1 : logo, vitrine mobile, panier WhatsApp, connexion, dashboard commerçant. Phase 2 : gestion produits, vitrine desktop, super-admin.

## 5. Règles de design obligatoires

1. Mobile-first : optimiser d’abord pour mobile.
2. Clarté : un commerçant non technique doit comprendre en 3 secondes.
3. Aspect professionnel SaaS, sérieux et moderne.
4. Respect strict de la palette vert `#075B35` et orange `#F07818`.
5. Espacement généreux, cartes et ombres douces.
6. CTA principal vert ou orange selon le contexte.
7. La vitrine ne doit jamais ressembler à l’interface d’administration BeninPublio.
8. Contraste suffisant, textes lisibles et boutons adaptés au doigt.

## 6. Textes d’interface à respecter

- Bouton commande : **Commander via WhatsApp**
- Mention sous le bouton : **La commande n’est confirmée qu’après réponse du commerçant**
- Stockage proche : **Votre espace approche de sa limite. Libérez de l’espace avant d’ajouter des images.**
- Stockage plein : **Vous avez atteint le quota inclus. Aucun fichier existant n’a été supprimé.**
- IA indisponible : **L’assistant IA est temporairement indisponible. Vous pouvez continuer manuellement.**
- Vitrine suspendue : **Cette vitrine est temporairement indisponible.**

## 7. Structure des écrans

### Vitrine publique
Header du commerçant (logo + nom + statut Ouvert/Fermé), catégories horizontales, grille de produits, bouton flottant/fixe « Commander via WhatsApp ». Pas de mention visible de BeninPublio, sauf éventuellement « Propulsé par BeninPublio » discret en bas.

### Espace commerçant
Sidebar gauche verte, dashboard avec statistiques, gestion produits/posts/paramètres, indicateur de quota clair, bouton principal orange « Ajouter un produit ».

### Super-Admin
Sidebar sombre ou verte, tableau global des vitrines, statistiques globales (Total, Actives, Suspendues, Revenus), actions de suspension/réactivation.

## 8. Livrables attendus

1. Logo SVG + PNG transparent et déclinaisons.
2. Maquettes haute-fidélité des 8 écrans.
3. Design system (couleurs, boutons, cards, inputs, typographie).
4. Versions mobile + desktop des écrans critiques.
5. Icônes cohérentes, ligne fine et style moderne.

## 9. Priorité de production

**Phase 1 (critique)** : logo, vitrine mobile, panier + WhatsApp, connexion, dashboard commerçant.  
**Phase 2** : gestion produits, vitrine desktop, super-admin.

**BeninPublio — Ensemble, développons le commerce local !**

Document transmis le 14 octobre 2026. Le Cahier des Charges V16 reste la référence pour arbitrer toute divergence fonctionnelle.

## Note d’intégration

Le ZIP livré avec ce brief contenait ce document et un README ; il ne contenait pas les maquettes/images évoquées comme disponibles dans une autre conversation. Le logo SVG et favicon du dépôt sont une première déclinaison vectorielle de travail, pas les huit maquettes haute-fidélité.