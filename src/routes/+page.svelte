<script lang="ts">

  import GlobalInfo from "../components/GlobalInfo.svelte"
  import RecipeComposition from "../components/RecipeComposition.svelte"
  import ResumeSummary from "../components/ResumeSummary.svelte"

  const allData:any={
    "maintenanceEnergyNeededFactor":{"dog":130, "cat":100},
    "idealWeightPow":{"dog":0.75, "cat":0.67}
  }
  // Données de paramétrage
  let species:string = $state("cat");
  let currentWeight:number = $state(5);
  let bodyConditionScore:number = $state(3); //NEC
  let idealWeight:number = $derived( currentWeight * ( 1 - ( bodyConditionScore - 5)/10 ) );
  let appliedEnergyNeeded:number = $state(360);
  let growingActivityPower:number = $state(1);
  
  // Données des besoins
  let maintenanceEnergyNeeded:number = $derived( allData["maintenanceEnergyNeededFactor"][species] * Math.pow(idealWeight, allData["idealWeightPow"][species]) * growingActivityPower );
  let proteinNeeded=$derived( maintenanceEnergyNeeded * 60 / 1000 );
  let calciumNeeded=$derived( maintenanceEnergyNeeded * 1.6 / 1000 );
  let phosphorusNeeded=$derived( maintenanceEnergyNeeded * 1.2 / 1000);

</script>

<style>
  h1{
    text-align: center;
  }
</style>

<div class="row">
  <h1>Composition d'une ration ménagère</h1>
  <div class="col-3">
    <GlobalInfo 
      bind:species={species}
      bind:currentWeight={currentWeight}
      bind:bodyConditionScore={bodyConditionScore}
      {idealWeight}
      bind:appliedEnergyNeeded={appliedEnergyNeeded}
      bind:growingActivityPower={growingActivityPower}
      {maintenanceEnergyNeeded}
      {proteinNeeded}
      {calciumNeeded}
      {phosphorusNeeded}
    />
  </div>
  <div class="col-9">
    <RecipeComposition {proteinNeeded} {calciumNeeded} {phosphorusNeeded}/>
    <ResumeSummary />
  </div>
</div>
