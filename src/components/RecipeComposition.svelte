<script lang="ts">
  import RangeDistribution from "./RangeDistribution.svelte"
  import FoodList from "./FoodList.svelte"

  //Données pour les protéines
  const proteinRange={min:60, max:120};
  let proteinDistribution = $state(80);

  const proteinList=[
    {"title":"Viande hachée cuite 5%", "em":1550, "pb":25.5, "ca":7, "pho":180},
    {"title":"Viande hachée cuite 15%", "em":2390, "pb":23.6, "ca":15, "pho":198},
    {"title":"Blanc de poulet cru", "em":1410, "pb":30.1, "ca":4.7, "pho":270},
  ];
  let choosenProteinFood:string[]=$state([]);

  //Données pour les légumes verts
  const greenVegetableRange={min:0, max:20};
  let greenVegetableDistribution = $state(5);

  const greenVegetableList=[
    {"title":"Haricots Verts", "em":1550, "pb":25.5, "ca":7, "pho":180},
    {"title":"Courgettes", "em":2390, "pb":23.6, "ca":15, "pho":198},
    {"title":"Poivrons", "em":1410, "pb":30.1, "ca":4.7, "pho":270},
  ];
  let choosenGreenVegetableFood:string[]=$state([]);


  //Données pour les huiles
  const oilRange={min:0, max:20};
  let oilDistribution = $state(5);

  //Données pour les glucides
</script>

<style>
  .sectionContainer{
    border:solid grey 1px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px grey;
    padding: 8px;
    margin: 20px 0px;
  }
  .titleContent{
    color: #413e3e;
    font-size:20px;
  }
  
</style>

<div class="sectionContainer">
  <div class="row">
    <div class="col-6">
      <h3>Composition des sources d'aliment</h3>
      <span class="titleContent">Protéines : </span>
      <RangeDistribution range={proteinRange} distribution={proteinDistribution}/>
      <FoodList list={proteinList} bind:choosenFood={choosenProteinFood}/>
      
      <div></div>
      
      <span class="titleContent">Légumes verts : </span>
      <RangeDistribution range={greenVegetableRange} distribution={greenVegetableDistribution}/>
      <FoodList list={greenVegetableList} bind:choosenFood={choosenGreenVegetableFood}/>

      <div></div>

      <span class="titleContent">Huile : </span>
      <RangeDistribution range={oilRange} distribution={oilDistribution}/>
      <ul>
        <li>Huile d'olive</li>
      </ul>

      <div></div>

      <span class="titleContent">Glucides</span>
      <ul>
        <li>Riz complet</li>
        <li>Pates blanches</li>
      </ul>

      <div></div>

      <span class="titleContent">AMV (Aliment Mineraux Vitamine)</span>
      <ul>
        <li>Calcium</li>
      </ul>

    </div>
    <div class="col-6">
      <h3>Sources de nutriments</h3>
    </div>
  </div>
</div>