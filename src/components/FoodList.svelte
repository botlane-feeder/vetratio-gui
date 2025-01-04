<script lang="ts">
  let {list, choosenFood=$bindable(), compositionFood=$bindable()} = $props();

  let selectedFood = $state(0);

  function addFood(){
    choosenFood.push( selectedFood );
  }
  function removeFood(index:number){
    choosenFood.splice(index,1);
  }
</script>

<style>
  ul {
    list-style-type: none;
  }

  .btn-add{
    width:25px;
    height:25px;
    margin:0px 10px;
    padding:0px;
    text-align: center;
    border-radius: 100px;
    background-color: var(--color-green);
  }
  .btn-remove{
    width:25px;
    height:25px;
    margin:0px 10px;
    padding:0px;
    text-align: center;
    border-radius: 100px;
    background-color: var(--color-orange);
  }
</style>

<ul>
  {#each compositionFood as oneFood, i}
    <li>{oneFood["name"]} | { oneFood["quantity"] }  g | <button class="btn btn-remove" onclick={()=>removeFood(i)}>-</button></li>
  {/each}
  <li>
    <select bind:value={selectedFood}>
      {#each list as food, index}
        <option value={index}>{food["title"]}</option>
      {/each}
    </select>
    <button class="btn btn-add" onclick={addFood}>+</button>
  </li>
</ul>