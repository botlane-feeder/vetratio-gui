<script lang="ts">
  // import {writable} from "svelte/store";

  import GlobalInfo from "../components/GlobalInfo.svelte"
  import RecipeComposition from "../components/RecipeComposition.svelte"

  import {type FoodComposition} from "$lib/types"
  // import {foodComposition} from "$lib/data/FoodComposition"

  const settings:any={
    "maintenanceEnergyNeededFactor":{"dog":130, "cat":100},
    "idealWeightPow":{"dog":0.75, "cat":0.67}
  }
  // Données de paramétrage
  let species:string = $state("cat");
  let currentWeight:number = $state(5);
  let bodyConditionScore:number = $state(3); //NEC
  let idealWeight:number = $derived( currentWeight * ( 1 - ( bodyConditionScore - 5)/10 ) );
  let appliedEnergyNeed:number = $state(360);
  let growingActivityPower:number = $state(1);
  
  // Données des besoins
  let maintenanceEnergyNeed:number = $derived( settings["maintenanceEnergyNeededFactor"][species] * Math.pow(idealWeight, settings["idealWeightPow"][species]) * growingActivityPower );
  let proteinNeed:number=$derived( maintenanceEnergyNeed * 60 / 1000 );
  let calciumNeed:number=$derived( maintenanceEnergyNeed * 1.6 / 1000 );
  let phosphorusNeed:number=$derived( maintenanceEnergyNeed * 1.2 / 1000);
  let oilNeed:number=$state(10);

  // Données des listes de compositions
  let proteinList:FoodComposition[]=$state([]);
  let greenVetegableList:FoodComposition[]=$state([]);
  let glucideList:FoodComposition[]=$state([]);
  let amvList:FoodComposition[]=$state([]);
  // let foodComposition:FoodComposition[]=$state([{name:"Viande Hachée", quantity:100}]);
  // let foodComposition=writable([
  //   {"name":"viande hachée 5%", "quantity":100, "protein":30, "glucide":40, "calcium":10, "phosphore":5}
  // ]);
  let foodCompositionList:FoodComposition[]=$derived.by(()=>{
    let list:FoodComposition[]=[]
    for (let index = 0; index < proteinList.length; index++) {
      list.push( proteinList[index] );
    }
    console.log(list);
    return list;
  });

</script>

<style>
  h1{
    text-align: center;
  }
  .sectionContainer{
    border:solid grey 1px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px grey;
    padding: 8px;
    margin: 20px 0px;
  }
</style>

<div class="row">
  <h1>Composition d'une ration ménagère</h1>
  <div class="col-3">
    <GlobalInfo 
      bind:species
      bind:currentWeight
      bind:bodyConditionScore
      {idealWeight}
      bind:appliedEnergyNeed
      bind:growingActivityPower
      {maintenanceEnergyNeed}
      {proteinNeed}
      {calciumNeed}
      {phosphorusNeed}
    />
  </div>
  <div class="col-9 sectionContainer">
      <RecipeComposition {proteinNeed} energyNeed={appliedEnergyNeed} {oilNeed}/>
  </div>
</div>
