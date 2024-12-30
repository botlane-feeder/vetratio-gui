<script lang="ts">
  import {roundTwo} from "../lib/index";

  let {
    species = $bindable(),
    currentWeight = $bindable(),
    bodyConditionScore = $bindable(),
    idealWeight,
    appliedEnergyNeed = $bindable(),
    maintenanceEnergyNeed,
    proteinNeed,
    calciumNeed,
    phosphorusNeed
  } = $props();

</script>

<style>
  .sectionContainer{
    border:solid grey 1px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px grey;
    padding: 8px;
    margin: 20px 0px;
  }
  .space-input-group{
    padding:5px 10px;
  }
  .titleContent{
    color: #413e3e;
    font-size:20px;
  }
</style>

<div class="sectionContainer">
  <h3>Renseignement sur l'animal</h3>
  <div>
    <div class="input-group space-input-group">
      <span id="speciesLabel" class="input-group-text">Choix de l'espèce de l'animal</span>
      <select id="species" class="form-select" bind:value={species}>
        <option value="dog">Chien</option>
        <option value="cat">Chat</option>
      </select>
    </div>
    
    <div class="input-group space-input-group">
      <span id="currentWeightLabel" class="input-group-text"> Poids actuel</span>
      <input id="currentWeight" type="number" class="form-control" bind:value={currentWeight}>
      <span class="input-group-text" id="currentWeightPostLabel">kg</span>
    </div>
    
    <div class="input-group space-input-group">
      <span id="BCSLabel" class="input-group-text"> NEC (Note d'État Corporel)</span>
      <input id="BCS" type="number" class="form-control" bind:value={bodyConditionScore}>
    </div>

    <div class="input-group space-input-group">
      <span id="idealWeightLabel" class="input-group-text"> Poids idéal</span>
      <input id="idealWeight" type="number" class="form-control" disabled value={ roundTwo(idealWeight) }>
      <span class="input-group-text" id="idealWeightPostLabel">kg</span>

    </div>
    
    <div class="input-group space-input-group">
      <span id="AENLabel" class="input-group-text"> BEA (Besoin Énergétique Appliqué)</span>
      <input id="AEN" type="number" class="form-control" bind:value={appliedEnergyNeed}>
    </div>

    <div class="input-group space-input-group">
      <span id="maintenanceEnergyNeededLabel" class="input-group-text"> BEE (Besoin Énergétique Entretien)</span>
      <input id="maintenanceEnergyNeeded" type="number" class="form-control" disabled value={ roundTwo(maintenanceEnergyNeed) }>
    </div>
  </div>
  <div>
    <span class="titleContent">Besoins spécifiques :</span>

    <div class="input-group space-input-group">
      <span id="proteinNeededLabel" class="input-group-text"> Besoin Protéique</span>
      <input id="proteinNeeded" type="number" class="form-control" disabled value={ roundTwo(proteinNeed) }>
      <span class="input-group-text" id="proteinNeededPostLabel">g / j</span>
    </div>
    <div class="input-group space-input-group">
      <span id="calciumNeededLabel" class="input-group-text"> Besoin Calcium</span>
      <input id="calciumNeeded" type="number" class="form-control" disabled value={ roundTwo(calciumNeed) }>
      <span class="input-group-text" id="calciumNeededPostLabel">g / j</span>

    </div>
    <div class="input-group space-input-group">
      <span id="phosphorusNeededLabel" class="input-group-text"> Besoin Phosphore</span>
      <input id="phosphorusNeeded" type="number" class="form-control" disabled value={ roundTwo(phosphorusNeed) }>
      <span class="input-group-text" id="phosphorusNeededPostLabel">g / j</span>

    </div>
  </div>
</div>