<script lang="ts">
  let {list, choosenFood=$bindable()} = $props();

  let selectedFood = $state(0);
  // let choosenFoodList:string[]=$state([]);

  function onclick(){
    choosenFood.push( list[selectedFood]["title"]);
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
    background-color: #e74c3c;
  }
</style>

<ul>
  {#each choosenFood as food}
    <li>{food}</li>
  {/each}
  <li>
    <select bind:value={selectedFood}>
      {#each list as food, index}
        <option value={index}>{food["title"]}</option>
      {/each}
    </select>
    <button class="btn btn-add" {onclick}>+</button>
  </li>
</ul>