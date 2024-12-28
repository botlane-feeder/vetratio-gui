import { type FoodCompositionType } from "$lib/types";

export let foodCompositionList:FoodCompositionType[] = $state([
  {"name":"viande hachée 5%", "quantity":100, "protein":30}
]);


// export let foodCompositionList:FoodCompositionType[] = $derived.by(()=>{
//   let list:FoodCompositionType[] = [];
//   for (let index = 0; index < 2; index++) {
//     list.push({name:"VH5", quantity:100, protein:10});
//   }
//   return list;
// });
