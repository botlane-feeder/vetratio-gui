<script lang="ts">
  import { slide } from 'svelte/transition';
  import "bootstrap-icons/font/bootstrap-icons.css";

  import { globalInfo, calculatedInfo } from "$lib/store/Animal"  

  let show:boolean = $state(true);
  // let globalInfo = $state(myAnimal.getGlobalInfo())


</script>

<div class="container" class:shadow={show}>
  {#if show}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div transition:slide >
    <header onclick={()=>{show = false;}}>
      Renseignements sur l'animal
      <i class="bi bi-arrow-up-left-square-fill"></i>      
    </header>
    <div class="animalInfo">
      <div class="formGroup">
        <label for="species">Espèce : </label>
        <select id="species" bind:value={$globalInfo["specie"]}>
          <option value="cat">Chat</option><option value="dog">Chien</option>
        </select>
        <!-- <input type="text" bind:value={$animalData.name} placeholder="Nom de l'animal"> -->
      </div>
      <div class="formGroup" title="À reseigner après mesure">
        <label for="actualWeight">Poids actuel (kg) : </label>
        <input id="actualWeight" type="number" bind:value={$globalInfo["currentWeight"]}/>
      </div>
      <div class="formGroup" title="À renseigner après palpation">
        <label for="nec" title="Note d'État Corporel">NEC : </label>
        <input id="nec" type="number" min=1 max=10 bind:value={$globalInfo["bodyConditionScore"]}/>
      </div>
      <div class="formGroup" title="Calculé à partir du Poids actuel et du NEC">
        <label for="idealWeight">Poids idéal (kg): </label>
        <input id="idealWeight" type="number" disabled value={$calculatedInfo["idealWeight"]}/>
      </div>
      <div class="formGroup">
        <label for="idealWeight" title="">BEA (Besoin Énergétique Appliqué) : </label>
        <input id="idealWeight" type="number" bind:value={$globalInfo["appliedEnergyNeed"]}/>
      </div>
      <div class="formGroup">
        <label for="idealWeight" title="Calculé à partir du poids idéal">BEE (Besoin Énergétique Entretien) : </label>
        <input id="idealWeight" type="number" disabled value={$calculatedInfo["maintenanceEnergyNeed"]}/>
      </div>
    </div>
    <div class="specificNeed">
      <!-- <div class="bold">Besoins spécifiques : </div> -->
      <div class="formGroup">
        <label for="idealWeight" title="">Besoin Protéique (g/j) : </label>
        <input id="idealWeight" type="number" disabled value={$calculatedInfo["proteinNeed"]}/>
      </div>
      <div class="formGroup">
        <label for="idealWeight" title="">Besoin Calcium (g/j) : </label>
        <input id="idealWeight" type="number" disabled value={$calculatedInfo["calciumNeed"]}/>
      </div>
      <div class="formGroup">
        <label for="idealWeight" title="">Besoin Phosphore (g/j) : </label>
        <input id="idealWeight" type="number" disabled value={$calculatedInfo["phosphoreNeed"]}/>
      </div>
    </div>
  </div>
  {:else}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <header class="closed" transition:slide onclick={()=>{show = true;}}>
      <i class="bi bi-arrow-down-square-fill"></i>
    </header>
  {/if}

</div>


<style>
  .container {
    background: white;
    border-right: 1px solid var(--primary-color);
    width: 380px;
    transition: all 0.3s ease;
    box-shadow: 0px 0px;
  }
  .shadow{
    box-shadow: 10px 40px 20px rgba(0, 0, 0, 0.5);
  }
  header{
    padding: 1rem;
    border-bottom: 1px solid #D4E6A5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem;
  }
  header.closed{
    width: auto;
    height:5px;
    margin-inline:auto;
    justify-content: center;
  }

  .animalInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .specificNeed{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .formGroup {
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.8rem;
  }

  .formGroup label {
    font-weight: 500;
    font-size: 0.8rem;
  }

  .formGroup input,
  .formGroup select {
    padding: 0.5rem;
    border: 1px solid #A7C957;
    background-color: var(--background-white);
    border-radius: 4px;
    font-size: 0.8rem;
    width: 80%;
    /* cursor: pointer; */
  }
  select:not(disabled){
    cursor: pointer;
  }
  
  .formGroup input:focus,
  .formGroup select:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 2px rgba(107, 140, 174, 0.2);
  }
  .formGroup input:disabled,
  .formGroup select:disabled {
    outline: none;
    background-color: #e7e7e7;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 2px rgba(107, 140, 174, 0.2);
    cursor:not-allowed;
  }

  @media (max-width:400px){
    .container {
      width:300px;
    }
    .animalInfo {
      grid-template-columns: repeat(1, 1fr);
    }
    .specificNeed{
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>