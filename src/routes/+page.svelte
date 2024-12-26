<script lang="ts">

  import GlobalInfo from "../components/GlobalInfo.svelte"
  import RecipeComposition from "../components/RecipeComposition.svelte"
  import ResumeSummary from "../components/ResumeSummary.svelte"

  const allData:any={
    "maintenanceEnergyNeededFactor":{"dog":130, "cat":100}
  }

  let species:string = $state("cat");
  let currentWeight:number = $state(5);
  let bodyConditionScore:number = $state(3); //NEC
  let idealWeight:number = $derived( Math.round(currentWeight * ( 1 - ( bodyConditionScore - 5)/10 )*100)/100 );
  let appliedEnergyNeeded:number = $state(360);
  let growingActivityPower:number = $state(1);
  let maintenanceEnergyNeeded:number = $derived( allData["maintenanceEnergyNeededFactor"][species] * idealWeight * growingActivityPower);


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
      idealWeight={idealWeight}
      bind:appliedEnergyNeeded={appliedEnergyNeeded}
      bind:growingActivityPower={growingActivityPower}
      maintenanceEnergyNeeded={maintenanceEnergyNeeded}
    />
  </div>
  <div class="col-9">
    <RecipeComposition />
    <ResumeSummary />
  </div>
</div>
