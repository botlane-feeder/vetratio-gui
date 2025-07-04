<script lang="ts">
  import { roundTwo } from "$lib/index";

  import { intakes } from "$lib/store/Recipe";


</script>

<div class="container">
  <header>
      Apports
  </header>
  <div class="paddingLeft">
    <div>Energie : {roundTwo($intakes.energy)} kcal </div>
    <div>Protéine : {roundTwo($intakes.protein)} g</div>
    <div>Calcium : {roundTwo($intakes.calcium)} mg</div>
    <div class="paddingLeft">Calcium + AMV : {roundTwo($intakes.calciumAMV)} mg</div>
    <div>Phosphore : {roundTwo($intakes.phosphorus)} mg</div>
    <div class="paddingLeft">Phosphore + AMV : {roundTwo($intakes.phosphorusAMV)} mg</div>
  </div>
</div>

<style>
 .container {
    background: white;
    border-right: 1px solid var(--primary-color);
    box-shadow: 2px 10px 10px 10px rgba(0, 0, 0, 0.1);
    min-height: 300px;
  }
  header{
    width: 250px;
    padding: 1rem;
    border-bottom: 1px solid #D4E6A5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .paddingLeft{
    padding-inline: 15px 0px;
  }
</style>
