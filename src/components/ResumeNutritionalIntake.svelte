<script lang="ts">
  import {roundTwo} from "$lib/index"

  let {proteinCompositionFood, greenVegetableCompositionFood, oilCompositionFood, carbohydrateCompositionFood, amvCompositionFood}=$props();

  // Gestion du calcul de la sommes des apports de protéines
  let proteinSum:number=$derived.by( ()=>{ return sumFromArrays("protein")});
  let glucideSum:number=$derived.by( ()=>{ return sumFromArrays("kcal")});
  let calciumSum:number=$derived.by( ()=>{ return sumFromArrays("calcium")});
  let calciumAMVSum:number=$derived.by( ()=>{ return calciumSum + sumAMVArrays("calcium"); });
  let phosphoreSum:number=$derived.by( ()=>{ return sumFromArrays("phosphorus")});
  let phosphoreAMVSum:number=$derived.by( ()=>{ return phosphoreSum + sumAMVArrays("phosphorus"); });

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
  function sumAMVArrays(nutrient:string):number{
    let sum=0;
    for (let index = 0; index < amvCompositionFood.length; index++) {
      sum += amvCompositionFood[index][nutrient];
    }
    return sum;
  }

</script>

<div>
  <h3>Apports :</h3>
  <ul>
    <li>
      Energie : {roundTwo(glucideSum)} kcal
    </li>
    <li>
      Proteines : {roundTwo(proteinSum)} g
    </li>
    <li>
      Calcium : {roundTwo(calciumSum*1000)} mg
      <ul>
        <li>
          Calcium + AMV: {roundTwo(calciumAMVSum*1000)} mg
        </li>
      </ul>
    </li>
    <li>
      Phosphore : {roundTwo(phosphoreSum*1000)} mg
      <ul>
        <li>
          Phosphore + AMV : {roundTwo(phosphoreAMVSum*1000)} mg
        </li>
      </ul>
    </li>
  </ul>
</div>