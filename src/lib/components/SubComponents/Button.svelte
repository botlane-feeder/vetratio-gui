<script lang="ts">
  let {isAdding, removeFood=null, addFood=null, index=0} = $props();
</script>

{#if isAdding}
<button class="addButton" onclick={()=>addFood(index)}>+</button>
{:else}
<button class="removeButton" onclick={()=>removeFood(index)}>-</button>
{/if}

<style>

  button{
    margin-inline:10px 0px;
    padding: 0.5rem 1rem;
    border: none;
    width: 50px;
    border-radius: 50px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  button:hover{
    box-shadow: 2px 2px 2px grey;
    transform: translateY(-2px);
  }
  .addButton{
    background-color:#a5d6a7;
  }
  .removeButton{
    background-color:#ef9a9a;
  }
</style>