<script lang="ts">
  import {roundTwo} from "$lib/index"

  let {list, choosenFood=$bindable(), need, nutrient} = $props();

  let selectedFood = $state(0);

  function calculateQuantity(){
    for (let index = 0; index < choosenFood.length; index++) {
      let quantityNeeded = roundTwo(need / list[choosenFood[index]["id"]][nutrient] * 100 / choosenFood.length);
      choosenFood[index]["quantity"] = quantityNeeded;
    }
  }
  function addFood(){
    choosenFood.push( {"id":selectedFood, "name":list[selectedFood]["title"], "quantity":0} );
    // Calcule toutes les quantités
    calculateQuantity();
    
  }
  function removeFood(index:number){
    choosenFood.splice(index,1);
    // Calcule toutes les quantités
    calculateQuantity();
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
    background-color: #E16A54;
  }
  .btn-remove{
    width:25px;
    height:25px;
    margin:0px 10px;
    padding:0px;
    text-align: center;
    border-radius: 100px;
    background-color: #F39E60;
  }
</style>

<ul>
  {#each choosenFood as oneFood, i}
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