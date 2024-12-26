# VetRatio GUI

Ce fichier commence la documentation technique de l'application VetRatio GUI.

Il s'agit d'une interface graphique qui calcule des ratios alimentaires pour avoir des indications pour le vétérinaire afin de prodiguer des conseils pour la santé de l'animal.

La première version de cette application se concentre sur la constitution d'une ration ménagère.

## Fonctionnalités

- Création d'une ration ménagère

## Création d'une ration ménagère

La ration ménagère est la cuisine réalisée par le maitre pour l'alimentation de l'animal (en remplacement des croquettes)
La ration ménagère doit être composée et suivre une *recette* afin de remplir les différents besoins de l'animal

### Informations préliminaire

Pour les calculs, on a besoin des informations sur l'animal :
- espèce (chien ou chat) *specie*
- poids actuel *CurrentWeight*
- NEC (Note d'État Corporel) *BobyConditionScore*

Le vétérinaire doit renseigner le BEA (Besoin Énergétique Appliqué) *AppliedEnergyNeeded*  
- Cette donnée peut-être calculée à partir du poids actuel de l'animal et de l'alimentation passé

### Calculs des besoins

On calcule le BEE (Besoin Énergétique en Entretien) *MaintenanceEnergyNeeded*
- pour un chien BEE = 130 * Poids Ideal
- pour un chat BEE = 100 * Poids Ideal
- IdealWeight = CurrentWeight * ( 1 - (( BCS - 5)/10) )

On calcule les différents besoins de
- protéine -> ProteinNeeded = 60 * BEE  (pour un chien) PN = 65 * BEE (pour chat)
- calcium -> CalciumNeeded = 1.6 * BEE
- phosphore -> PhosphorusNeeded = 1.2 * BEE

### Composition

Ensuite on compose la ration ménagère qui est composé de 4 éléments :  
- source de protéines
- source de légumes verts
- source d'huile
- source de glucide
- source AMV (Alimentation Minéraux et Vitamines)

Pour chaque source, on sélectionne un aliment et le grammage est calculé automatiquement.  
S'il y a plusieurs aliments pour une source, on peut selectionner la proportion.  
Il y a 3 sliders pour réguler un pourcentage de 
- protéine, entre 60 et 120, par défaut 80
- légumes verts, entre 0 et 20, par défaut 5
- huiles, entre 0 et 20, par défaut 5

### Recette

À partir de la composition, une recette doit être rédigée pour la copier / coller pour avoir un résumé.


## Calculs

### Données de configuration

L'application fonctionne pour deux espèces animales : 
- le chien,
- le chat

Selon les espèces, d'autres données de configuration sont à renseigner : 
- ...

À la selection de l'espèce, les données physiologiques sont chargées.

Ses données sont : 
- Entretien
- Gestation
- Lactation
- Croissance

### Calcul du poids idéal

Le poids idéal *IdealWeight* est calculé par le poids actuel *CurrentWeight* et le NEC (Note d'état corporel) *BCS*
- IdealWeight = CurrentWeight * ( 1 - (( BCS - 5)/10) )

### Calcul du besoin énergétique théorique

Données initiales :
- cat
  - maintenance : 561.55
  - gestation : 735.75
  - lactation : 1554.97
  - growing : 1065.97
  - kGrowing : 6.7 * ( exp( -0.189 * IdealWeight / AdultWeight ) - 0.66 )
- dog
  - maintenance : 369.54
  - gestation : 517.36
  - lactation : 911.24
  - growing : 713.58
  - kGrowing : (1.8 - ( IdealWeight / AdultWeight ) ) / 0.8


### Calcul des apports des l'alimentation



### Calcul de l'apport énergétique


### Calcul du K Réel


## TODO

- Selection des données de l'animal pour récupération des données physiologiques stockées ...
- Calcul des ratios
- Enregistrement et historique des consommations alimentaires
- Enregistrement des données de constitution des croquettes

- Envoyer un mail....