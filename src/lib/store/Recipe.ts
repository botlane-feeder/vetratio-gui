import {get, writable, type Writable, derived, type Readable} from "svelte/store";
import {globalInfo, calculatedInfo} from "./Animal"

export const isAutomatedCalcultation = writable(true);

type percentIntakeType = {
  "protein":number,
  "vegetable":number,
  "carbohydrate":number,
  "oil":number,
  "amv":number
};
export const percentages:Writable<percentIntakeType> = writable({
  "protein":80,
  "vegetable":5,
  "oil":5,
  "carbohydrate":100,
  "amv":100
});

/** Gestion des recettes
 * - Types
 * - FoodList
 */
export type settingsFoodFeatureType = {
  title:string,
  kcal:number,
  protein:number,
  calcium:number,
  phosphorus:number
}
export type foodFeatureType = {
   title:string,
   kcal:number,
   protein:number,
   calcium:number,
   phosphorus:number,
   quantity:number
}
type listCategorieType = "protein" | "vegetable" | "carbohydrate" | "oil" | "amv";
type foodListType = {
  "protein":foodFeatureType[],
  "vegetable":foodFeatureType[],
  "carbohydrate":foodFeatureType[],
  "oil":foodFeatureType[],
  "amv":foodFeatureType[]
};

const initList:foodListType = {
  "protein":[],
  "vegetable":[],
  "carbohydrate":[],
  "oil":[],
  "amv":[]
}
function createList(list:foodListType){
  const {subscribe, update} = writable<foodListType>(list);

  return{
    subscribe,
    addFood(categorie:listCategorieType, oneFood:settingsFoodFeatureType){
      update((list)=>{
        // let newFood :foodFeatureType= {...oneFood, quantity:0};
        list[categorie].push( {...oneFood, quantity:0} );
        console.log(list);
        return list
      });
      this.calculateFoodQuantity();
    },
    removeFood(categorie:listCategorieType, indexToRemove:number){
      update((list)=>{
        list[categorie].splice(indexToRemove, 1);
        return list
      })
      this.calculateFoodQuantity();
    },
    updateQuantity(categorie:listCategorieType, index:number, quantity:number){
      if( get(isAutomatedCalcultation)==false ){
        update((list)=>{
          list[categorie][index]["quantity"]=quantity;
          return list
        })
      }
    },
    calculateFoodQuantity(){
      if( get(isAutomatedCalcultation) ){
        update((list)=>{
          // SI auto-calcul
          list["protein"] = this.calculatedProteinFoodQuantity(list["protein"]);
          return list;
        });
      }
    },
    calculatedProteinFoodQuantity(list:foodFeatureType[]){
      let amount = list.length;
      let proteinNeeded = get(calculatedInfo)["proteinNeed"] * get(percentages)["protein"];
      // console.log("amount : "+amount+" proteinNeeded : "+proteinNeeded );
      for (let index = 0; index < list.length; index++) {
        
        let quantity = (proteinNeeded/amount) / list[index]["protein"];
        list[index]["quantity"] = quantity;
        // console.log( list["protein"][index]["title"]+" : "+quantity+" = "+quantity * list["protein"][index]["protein"]);
      }
      return list;
    }
  }
}
export const myList = createList(initList);
percentages.subscribe( (percentages) =>{ myList.calculateFoodQuantity(); })

derived(percentages, ($percentages)=>{console.log($percentages)});

/** Intakes, gestion des apports
 * 
 */
type FoodIntakesType = {
  energy:number,
  protein:number,
  calcium:number,
  calciumAMV:number,
  phosphorus:number,
  phosphorusAMV:number
};
export const intakes:Readable<FoodIntakesType> = derived(myList,($myList:foodListType)=>{
  console.log("Calcul des intakes");
  let intakes = {
    protein:0,
    energy:0,
    calcium:0,
    calciumAMV:0,
    phosphorus:0,
    phosphorusAMV:0
  }
  for(let elem in $myList){
    for (let index = 0; index < $myList[elem].length; index++) {
      intakes["protein"] += $myList[elem][index]["protein"] * $myList[elem][index]["quantity"]/100;
    }
  }
  return intakes;
});


/** IngredientList, gestion de la liste des ingrédients
 * 
 */

const foodList = derived(myList, ()=>{
  console.log("Création de la liste des ingrédients");
  return [];
});

/* Fonctionnalités
- stockage des différentes listes

*A chaque modification :*
- calcul automatique des quantités si selectionné
- calcul des apports globaux
- génération de la recette
  
*/