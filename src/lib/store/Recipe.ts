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
    getList(){ return list;},
    addFood(categorie:listCategorieType, oneFood:settingsFoodFeatureType){
      update((list)=>{
        // let newFood :foodFeatureType= {...oneFood, quantity:0};
        list[categorie].push( {...oneFood, quantity:0} );
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
          list["vegetable"] = this.calculatedVegetableFoodQuantity(list["vegetable"]);
          list["oil"] = this.calculatedOilFoodQuantity(list["oil"]);
          list["carbohydrate"] = this.calculatedCarbohydrateFoodQuantity(list["carbohydrate"], this.getCarbohydrateNeed(list));
          return list;
        });
      }
    },
    calculatedProteinFoodQuantity(list:foodFeatureType[]){
      let foodAmount = list.length;
      let proteinNeeded = get(calculatedInfo)["proteinNeed"]*100 * get(percentages)["protein"]/100;
      // Par chaque aliment, calcule du nombre de quantité nécessaire
      for (let index = 0; index < list.length; index++) {
        let quantity = (proteinNeeded/foodAmount) / list[index]["protein"];
        list[index]["quantity"] = quantity;
      }
      return list;
    },
    calculatedVegetableFoodQuantity(list:foodFeatureType[]){
      let foodAmount = list.length;
      let energyNeeded = get(globalInfo)["appliedEnergyNeed"]*1000 * get(percentages)["vegetable"]/100;
      // Par chaque aliment, calcule du nombre de quantité nécessaire
      for (let index = 0; index < list.length; index++) {
        let quantity = (energyNeeded/foodAmount) / list[index]["kcal"];
        list[index]["quantity"] = quantity;
      }
      return list;
    },
    calculatedOilFoodQuantity(list:foodFeatureType[]){
      let foodAmount = list.length;
      let energyNeeded = get(globalInfo)["appliedEnergyNeed"]*1000 * get(percentages)["oil"]/100;
      // Par chaque aliment, calcule du nombre de quantité nécessaire
      for (let index = 0; index < list.length; index++) {
        let quantity = (energyNeeded/foodAmount) / list[index]["kcal"];
        list[index]["quantity"] = quantity;
      }
      return list;
    },
    getCarbohydrateNeed(list:foodListType):number{
      // Calcule des calories ingérés par les protéines
      let proteinesEnergy=0;
      for (let index = 0; index < list["protein"].length; index++) {
        proteinesEnergy+=list["protein"][index]["quantity"] * list["protein"][index]["kcal"];
      }
      // Calcule des calories ingérés par les légumes verts
      let vegetableEnergy=0;
      for (let index = 0; index < list["vegetable"].length; index++) {
        vegetableEnergy+=list["vegetable"][index]["quantity"] * list["vegetable"][index]["kcal"];
      }
      // Calcule des calories ingérés par l'huile
      let oilEnergy=0;
      for (let index = 0; index < list["oil"].length; index++) {
        vegetableEnergy+=list["oil"][index]["quantity"] * list["oil"][index]["kcal"];
      }
      return get(globalInfo)["appliedEnergyNeed"]*1000 - proteinesEnergy - vegetableEnergy - oilEnergy;
    },
    calculatedCarbohydrateFoodQuantity(list:foodFeatureType[], carbohydrateEnergyNeed:number){
      let foodAmount = list.length;
      // Par chaque aliment, calcule du nombre de quantité nécessaire
      for (let index = 0; index < list.length; index++) {
        let quantity = (carbohydrateEnergyNeed/foodAmount) / list[index]["kcal"];
        list[index]["quantity"] = quantity;
      }
      return list;
    }
  }
}
export const myList = createList(initList);
globalInfo.subscribe( (globalInfo) =>{ myList.calculateFoodQuantity(); })
calculatedInfo.subscribe( (calculatedInfo) =>{ myList.calculateFoodQuantity(); })
percentages.subscribe( (percentages) =>{ myList.calculateFoodQuantity(); })

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
      intakes["energy"] += $myList[elem][index]["kcal"] * $myList[elem][index]["quantity"]/1000;
      intakes["calcium"] += $myList[elem][index]["calcium"] * $myList[elem][index]["quantity"]/100;
      intakes["phosphorus"] += $myList[elem][index]["phosphorus"] * $myList[elem][index]["quantity"]/100;
    }
  }
  return intakes;
});


/** IngredientList, gestion de la liste des ingrédients
 * 
 */

export const ingredientList = derived(myList, ()=>{

  function array_merge(foodList:foodListType):foodFeatureType[]{
    let list:foodFeatureType[] = [];
    for(let elem in foodList){
      for (let index = 0; index < foodList[elem].length; index++) {
        list.push(foodList[elem][index]);
      }
    }
    return list;
  } 
  function array_reduce(list:foodListType):foodFeatureType[]{
    return array_merge(list).reduce((acc:foodFeatureType[], current:foodFeatureType) => {
        // Vérifiez si l'élément avec le même nom existe déjà dans l'accumulateur
        const existing = acc.find(item => item.title === current.title);

        if (existing) {
            // Si l'élément existe, ajoutez la quantité
            existing.quantity += current.quantity;
        } else {
            // Sinon, ajoutez l'élément à l'accumulateur
            acc.push({ ...current });
        }

        return acc;
    }, []);
  }

  return array_reduce({...myList.getList()}); //ingredientList;
});



/* Fonctionnalités
- stockage des différentes listes

*A chaque modification :*
- calcul automatique des quantités si selectionné
- calcul des apports globaux
- génération de la recette
  
*/