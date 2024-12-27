# Documentation de développement

L'interface graphique doit gérer ce qu'on appelle les rations ménagères, pour ce faire elle sera découpée en plusieurs parties : 
- GloblaInfo : partie qui permet de renseigner et d'afficher des informations globales
- Composition : partie qui permet de composer une ration ménagère
- Nutriment : partie qui permet de calculer l'apport de nutriment
- Recette : partie qui résume la liste des ingrédients pour la copier/coller

## Détails

Toutes ces parties sont gérées par un

### GlobalInfo

GlobalInfo est un composant composé de champs :
- espèce `species`
- poid actuel `currentWeight`
- 

### Composition

Composition est un composant géré en 5 parties : 
- Protéines
- Légumes verts
- Huiles
- Glucides
- AMV

Chacune des parties est décomposés en plusieurs composants.
- Pour les parties Protéines, Légumes verts et Huiles, nous trouvons 
  - un titre
  - un slider
  - une liste 

la liste s'ajoute en selectionnant des aliments et en les ajoutant, puis en calculant la quantité d'aliment à nécessaire pour répondre au besoin de l'animal

se reposant sur plusieurs composants :
- 