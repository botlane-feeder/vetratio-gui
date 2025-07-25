# Documentation de développement

L'interface graphique doit gérer ce qu'on appelle les rations ménagères, pour ce faire elle sera découpée en plusieurs parties : 
- GloblaInfo : partie qui permet de renseigner et d'afficher des informations globales
- Composition : partie qui permet de composer une ration ménagère
- Nutriment : partie qui permet de calculer l'apport de nutriment
- Recette : partie qui résume la liste des ingrédients pour la copier/coller

## V1

Chemin de dépendances : 
- RecipeSumary : liste des ingrédients pour faire une ration alimentaire
  - a besoin de
    - list : la liste des aliments selectionnés
- FoodIntakes : représente les apports nutritifs de la ration alimentaire
  - a besoin de 
    - list : la liste des aliments selectionnés

- list : la liste des aliments selectionnées
  - avec la quantité pour chaque ligne de nouritures
  - a besoin de
    - calculatedInfo : les besoin de l'animal en terme d'apport
    - percentages : un pourcentage d'attribution pour un aliment
    - addFood() : une fonction pour ajouter un aliment à la liste par l
    - calculationQuantity() : une fonction pour calculer automatiquement les quantités pour chaque aliment

- calculatedInfo : des données calculées sur le besoin de l'animal
  - a besoin de
    - paramètres
    - données de l'animal à renseigner par l'utilisateur

Ce chemin des dépendances permet de savoir sur quelle(s) dépendance(s) doit observer une variable pour être calculée

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
  - un `RangeDistribution`
  - une `FoodList` 

la liste s'ajoute en selectionnant des aliments et en les ajoutant, puis en calculant la quantité d'aliment à nécessaire pour répondre au besoin de l'animal

se reposant sur plusieurs composants :
- 


### FoodList

Crée une liste d'ingrédients selectionnés, à partir d'une base de données passées en paramètres.

Si FoodList a un calcul automatique des quantités, alors
- cette liste est retravaillée, pour calculer la quantité correspondante au
  - besoin spécifique calculé (ex : protéine, calcium, phosphore)
  - curseur selectionné