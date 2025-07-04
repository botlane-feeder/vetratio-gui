<script lang=ts>
  import { isAutomatedCalcultation } from "$lib/store/Recipe";

  import Protein from "./CompositionFeatures/Protein.svelte";
  import Vegetable from "./CompositionFeatures/Vegetable.svelte";
  import Oil from "./CompositionFeatures/Oil.svelte";
  import Carbohydrate from "./CompositionFeatures/Carbohydrate.svelte";
  import AMV from "./CompositionFeatures/AMV.svelte";
</script>

<div class="container">
  <h3>Composition des sources d'aliment</h3>
  <div><input type="checkbox" bind:checked={$isAutomatedCalcultation}>Calcul automatique des quantités</div>
  <Protein />
  <Vegetable />
  <Oil />
  <Carbohydrate />
  <AMV />

</div>

<style>

</style>