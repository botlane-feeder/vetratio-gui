import {type FoodComposition} from "./types"

export class FoodCompositionList {

  list:FoodComposition[]=$state([]);

  //Ajoute une composition à la liste
  addFoodComposition(oneFoodComposition:FoodComposition){
    this.list.push( oneFoodComposition );
  }
  //Supprime toutes les compositions
  resetFoodComposition(){
    this.list=[];
  }

}