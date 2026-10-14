# BeninPublio — Design system V1

Source : `BeninPublio_Design_Brief_V1.md`, transmis le 14 octobre 2026. Le cahier des charges V16 reste la référence fonctionnelle.

## Positionnement et surfaces
- **Plateforme** : accueil, espace commerçant et console super-admin ; marque BeninPublio visible.
- **Vitrine publique** : page individuelle d'un commerce ; identité du commerçant dominante, aucune navigation de gestion BeninPublio.
- Les données et les actions métier restent servies par le Worker V16 ; le design ne doit jamais remplacer les contrôles d'autorisation côté serveur.

## Tokens officiels
- Vert principal : `#075B35` — navigation et actions primaires.
- Vert profond : `#063E27` — états hover et surfaces sombres.
- Orange : `#F07818` — accent et actions d'ajout.
- Jaune : `#F5C400` — repères et accents légers.
- Blanc : `#FFFFFF`; gris clair : `#F5F5F5`; texte : `#333333`; secondaire : `#666666`.
- Typographie de l'interface : Manrope pour les titres et DM Sans pour le corps, avec polices de secours système.

## Composants et règles
- Mobile-first, zones tactiles confortables, mise en page fluide et focus clavier visible.
- Boutons principaux verts ; orange réservé aux accents/ajouts, sans compromettre le contraste.
- Cartes avec bordure douce, coins arrondis et ombres discrètes.
- La vitrine affiche « Commander via WhatsApp » et la mention exacte « La commande n’est confirmée qu’après réponse du commerçant ».
- Le bouton ouvre le panier ; l'utilisateur déclenche lui-même l'envoi WhatsApp. Aucun envoi automatique.
- Ne jamais supprimer automatiquement des fichiers existants lorsqu'un quota est atteint.
- L'IA reste facultative et désactivée tant que la configuration ne l'autorise pas.

## Visuels prioritaires
Le brief prévoit un logo, une vitrine mobile, un panier WhatsApp, une connexion et un tableau de bord commerçant en Phase 1. Le package ZIP fourni contient uniquement le brief Markdown et ce README ; il ne contient pas les maquettes ou images mentionnées comme étant disponibles dans une autre conversation. Les fichiers SVG créés dans ce dépôt sont des actifs vectoriels initiaux, pas des maquettes haute-fidélité.

## État d'intégration
- [x] Palette, typographie et composants de base alignés avec le brief.
- [x] Logo vectoriel et favicon ajoutés au dépôt.
- [x] CTA de commande mobile de la vitrine ajouté.
- [ ] Maquettes haute-fidélité des huit écrans : non fournies dans l'archive.
- [ ] Validation visuelle sur appareil réel et tests E2E : restent à faire.
