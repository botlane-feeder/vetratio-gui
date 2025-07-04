<script lang="ts">
  import Button from "./Button.svelte"
  import { roundTwo } from "$lib/index";
  import { isAutomatedCalcultation } from "$lib/store/Recipe";


  let { list=$bindable(), removeFood, updateQuantity } = $props();

</script>

<div class="container">
  {#each list as oneSelected, index}
    <div>
      {oneSelected["title"]}
      |
      {#if $isAutomatedCalcultation}
        {roundTwo(oneSelected["quantity"])}
      {:else}
        <input type="number" bind:value={oneSelected["quantity"]} onchange={()=>updateQuantity(index)}>
      {/if}
      g<Button isAdding={false} {removeFood} {index}/>
    </div>
  {/each}
</div>

<style>
  .container{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 20px;
  }
  .container div{
    margin-block:2px;
  }

  input{
    width:50px;

  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
     margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
</style>