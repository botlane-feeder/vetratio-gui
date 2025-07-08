<script lang="ts">

  import Button from "../SubComponents/Button.svelte";
  import FoodList from "../SubComponents/FoodList.svelte";

  import { myList, type foodFeatureType } from "$lib/store/Recipe";

  const categorie = "amv";
    
  const amvFoodArray=[
    {"title":"Calcidia", "kcal":0, "protein":0, "calcium": 154000, "phosphorus":0},
    {"title":"Vit'i5 Orange", "kcal":0, "protein":0, "calcium": 15000, "phosphorus":5000},
    {"title":"Vit'i5 Bleu", "kcal":0, "protein":0, "calcium": 10000, "phosphorus":1000},
  ];

  let selectValue=$state(0);
  let localList:foodFeatureType[] = $state([]);
  myList.subscribe((list)=>{localList = list["amv"];});

  function addFood(){
    myList.addFood(categorie, amvFoodArray[selectValue]);
  }
  function removeFood(indexToRemove:number){
    myList.removeFood(categorie, indexToRemove);
  }
  function updateQuantity(index:number){
    myList.updateQuantity(categorie, index, localList[index]["quantity"]);
  };
</script> 

<div class="container">
  <div class="title">
    AMV :
  </div>
  <FoodList list={localList} {removeFood} {updateQuantity}/>
  <div class="selectOneFood">
    <div class="select-wrapper">
      <select bind:value={selectValue}>
      {#each amvFoodArray as oneAliment, idAliment}
        <option value={idAliment}>{oneAliment["title"]}</option>
      {/each}
      </select>
      <div class="select-icon">▼</div>
    </div>
    <Button isAdding={true} {addFood}/>
  </div>

</div>

<style>
  .container{
    display: flex;
    flex-direction: column;
    align-items:start;
    margin-block: 15px;
  }
  .title{
    display: flex;
    flex-direction: row;
    font-size: large;
  }

  .selectOneFood{
    display: flex;
    width:100%;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    /* padding-block:10px; */
  }
  .select-wrapper {
    position: relative;
    width:100%;
  }
  select{
    width: 100%;
    padding-block: 0.5rem;
    padding-inline: 1rem 2.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    background-color: white;
    font-size: 0.9rem;
    color: var(--dark-color-font);
    appearance: none;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  select:focus {
    outline: none;
    border-color: #A7C957;
    box-shadow: 0 0 0 2px rgba(167, 201, 87, 0.2);
  }

  select:hover:not(:disabled) {
    border-color: #6B8CAE;
  }
  .select-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #6B8CAE;
    font-size: 0.75rem;
  }

</style>