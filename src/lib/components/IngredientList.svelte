<script lang="ts">
  import { ingredientList } from "$lib/store/Recipe";
  import { roundTwo } from "$lib/index";

</script>

<div class="container">
  <div class="header">Liste des ingrédients</div>
  <ul>
    {#if $ingredientList.length > 0}
    {#each $ingredientList as oneIngredient}
    <li>{oneIngredient["title"]} : {roundTwo(oneIngredient["quantity"])}g</li>
    {/each}
    {:else}
    <li> <i class="bi bi-arrow-left-circle"></i> Ajoutez un aliment dans votre composition à l'aide du selecteur et du bouton <i class="bi bi-plus-circle-fill green-button"></i> </li>
    {/if}
  </ul>
</div>

<style>
 .container {
    background: white;
    border-right: 1px solid var(--primary-color);
    box-shadow: 2px 10px 10px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    min-height: 300px;
  }
  .header{
    /* width: 250px; */
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
  .green-button{
    color: var(--action-button-green);
  }

</style>