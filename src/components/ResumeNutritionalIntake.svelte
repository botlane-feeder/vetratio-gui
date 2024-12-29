<script lang="ts">
  import {roundTwo} from "$lib/index"

  let {proteinCompositionFood, greenVegetableCompositionFood, oilCompositionFood, carbohydrateCompositionFood}=$props();

  // Gestion du calcul de la sommes des apports de protéines
  let proteinSum:number=$derived.by( ()=>{ return sumFromArrays("protein")});
  let glucideSum:number=$derived.by( ()=>{ return sumFromArrays("kcal")});
  let calciumSum:number=$derived.by( ()=>{ return sumFromArrays("calcium")});
  let phosphoreSum:number=$derived.by( ()=>{ return sumFromArrays("phosphorus")});

  // Fait le tour des tableaux d'aliments et calcul la somme du nutriment passé en paramètre
  function sumFromArrays(nutrient:string):number{
    let sum=0;
    for (let index = 0; index < proteinCompositionFood.length; index++) {
      sum += proteinCompositionFood[index][nutrient];
    }
    for (let index = 0; index < greenVegetableCompositionFood.length; index++) {
      sum += greenVegetableCompositionFood[index][nutrient];
    }
    for (let index = 0; index < oilCompositionFood.length; index++) {
      sum += oilCompositionFood[index][nutrient];
    }
    for (let index = 0; index < carbohydrateCompositionFood.length; index++) {
      sum += carbohydrateCompositionFood[index][nutrient];
    }
    return sum;
  }

</script>

<div>
  <h3>Apports :</h3>
  <ul>
    <li>
      Proteines : {roundTwo(proteinSum)} g
    </li>
    <li>
      Glucides : {roundTwo(glucideSum)} g
    </li>
    <li>
      Calcium : {roundTwo(calciumSum*1000)} mg
    </li>
    <li>
      Phosphore : {roundTwo(phosphoreSum*1000)} mg
    </li>
  </ul>
</div>