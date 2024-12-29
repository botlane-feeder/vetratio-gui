<script lang="ts">
  import {roundTwo} from "$lib/index"
  import type { FoodComposition } from "$lib/types";

  let {proteinCompositionFood, greenVegetableCompositionFood, oilCompositionFood, carbohydrateCompositionFood}=$props();

  let recipe:FoodComposition[] = $derived.by(()=>{
    return array_reduce();
  });

  function array_merge():FoodComposition[]{
    let list:FoodComposition[] = [];
    for (let index = 0; index < proteinCompositionFood.length; index++) {
      list.push(proteinCompositionFood[index]);
    }
    for (let index = 0; index < greenVegetableCompositionFood.length; index++) {
      list.push(greenVegetableCompositionFood[index]);
    }
    for (let index = 0; index < oilCompositionFood.length; index++) {
      list.push(oilCompositionFood[index]);
    }
    for (let index = 0; index < carbohydrateCompositionFood.length; index++) {
      list.push(carbohydrateCompositionFood[index]);
    }
    return list;
  }
  function array_reduce():FoodComposition[]{
    return array_merge().reduce((acc, current) => {
        // Vérifiez si l'élément avec le même nom existe déjà dans l'accumulateur
        const existing = acc.find(item => item.name === current.name);

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

</script>

<style>
  .sectionContainer{
    border:solid grey 1px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px grey;
    padding: 8px;
    margin: 20px 0px;
  }
</style>

<div class="sectionContainer">
  <h3>Recette de la ration ménagère</h3>
  <ul>
    {#each recipe as oneFood}
    <li>{oneFood.name} | {oneFood.quantity} g</li>
    {/each}
  </ul>
</div>