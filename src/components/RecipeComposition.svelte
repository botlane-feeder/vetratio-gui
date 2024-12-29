<script lang="ts">
  import RangeDistribution from "./RangeDistribution.svelte"
  import FoodList from "./FoodList.svelte"
  import ResumeNutritionalIntake from "./ResumeNutritionalIntake.svelte"

  import ResumeSummary from "../components/ResumeSummary.svelte"

  import {roundTwo} from "$lib/index"

  import {type FoodComposition} from "$lib/types"

  let {proteinNeed, energyNeed, oilNeed} = $props()

  const rawAlimentList={
    "protein":
    [
      {"title":"Viande hachée cuite 5%", "kcal":1550, "protein":25.5, "calcium":7, "phosphorus":180},
      {"title":"Viande hachée cuite 15%", "kcal":2390, "protein":23.6, "calcium":15, "phosphorus":198},
      {"title":"Blanc de poulet cuit", "kcal":1410, "protein":30.1, "calcium":4.7, "pho":270},
    ],
    "greenVegetable":[
      {"title":"Haricots Verts", "kcal":1550, "protein":1.95, "calcium":7, "phosphorus":180},
      {"title":"Courgettes", "kcal":2390, "protein":23.6, "calcium":15, "phosphorus":198},
      {"title":"Poivrons", "kcal":363, "protein":30.1, "calcium":4.7, "phosphorus":270},
    ],
    "oil":[
      {"title":"Huile d'Olive", "kcal":1550, "protein":0, "calcium":0, "phosphorus":0},
    ],
    "carbohydrate":[
      {"title":"Riz Blanc, cuit, non salé", "kcal":1440, "protein":2.92, "calcium": 14, "phosphorus":35},
      {"title":"Riz complet, cuit, non salé", "kcal":1570, "protein":3.21, "calcium":13, "phosphorus":120},
      {"title":"Riz Blanc, cru", "kcal":3500, "protein":7.04, "calcium": 33, "phosphorus":118},
      {"title":"Riz complet, cru", "kcal":3490, "protein":7.02, "calcium":11.1, "phosphorus":163},
    ]
  };

  /**************************** Données pour les protéines ****************************/
  const proteinRange={min:60, max:120};
  let proteinDistribution = $state(80);
  let proteinNeedQuantity = $derived( proteinNeed * proteinDistribution/100 );

  let choosenProteinFood:number[]=$state([]);
  let proteinCompositionFood:FoodComposition[]=$derived.by(()=>{
    let foodArray:FoodComposition[]=[];
    for (let index = 0; index < choosenProteinFood.length; index++) {
      let quantityNeeded = roundTwo(proteinNeedQuantity / rawAlimentList["protein"][choosenProteinFood[index]]["protein"] * 100 / choosenProteinFood.length);
      foodArray.push( {
        "name":rawAlimentList["protein"][choosenProteinFood[index]]["title"],
        "quantity":quantityNeeded,
        "protein":(rawAlimentList["protein"][choosenProteinFood[index]]["protein"]*quantityNeeded/100),
        "kcal":(rawAlimentList["protein"][choosenProteinFood[index]]["kcal"]*quantityNeeded/1000),
        "calcium":0,
        "phosphorus":0
      });
    }
    return foodArray;
  });


  /**************************** Données pour les légumes verts ****************************/
  const greenVegetableRange={min:0, max:20};
  let greenVegetableDistribution = $state(5);
  let carbohydratesGreenVegetableNeedQuantity = $derived( energyNeed * greenVegetableDistribution / 100); 

  let choosenGreenVegetableFood:number[]=$state([]);
  let greenVegetableCompositionFood:FoodComposition[]=$derived.by(()=>{
    let foodArray:FoodComposition[]=[];
    for (let index = 0; index < choosenGreenVegetableFood.length; index++) {
      let quantityNeeded = roundTwo(carbohydratesGreenVegetableNeedQuantity / rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["kcal"] * 1000 / choosenGreenVegetableFood.length);
      foodArray.push( {
        "name":rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["title"],
        "quantity":quantityNeeded,
        "protein":(rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["protein"]*quantityNeeded/100),
        "kcal":(rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["kcal"]*quantityNeeded/1000),
        "calcium":0,
        "phosphorus":0
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });

  /**************************** Données pour les huiles ****************************/
  const oilRange={min:0, max:20};
  let oilDistribution = $state(5);
  let oilNeedQuantity = $derived( oilNeed * greenVegetableDistribution); 

  let choosenOilFood:number[]=$state([]);
  let oilCompositionFood:FoodComposition[]=$derived.by(()=>{
    let foodArray:FoodComposition[]=[];
    for (let index = 0; index < choosenOilFood.length; index++) {
      let quantityNeeded = roundTwo(oilNeedQuantity / rawAlimentList["oil"][choosenOilFood[index]]["kcal"] * 1000 / choosenOilFood.length);
      foodArray.push( {
        "name":rawAlimentList["oil"][choosenOilFood[index]]["title"],
        "quantity":quantityNeeded,
        "protein":(rawAlimentList["oil"][choosenOilFood[index]]["protein"]*quantityNeeded/100),
        "kcal":(rawAlimentList["oil"][choosenOilFood[index]]["kcal"]*quantityNeeded/1000),
        "calcium":0,
        "phosphorus":0
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });

  /**************************** Données pour les glucides ****************************/
  let carbohydratesEnergyNeed = $derived.by(()=>{
    let greenVegetableEnergy = 0;
    for (let index = 0; index < greenVegetableCompositionFood.length; index++) {
      greenVegetableEnergy += greenVegetableCompositionFood[index]["kcal"];
    }
    return energyNeed - greenVegetableEnergy;
  })
  let choosenCarbohydrateFood:number[]=$state([]);
  let carbohydrateCompositionFood:FoodComposition[]=$derived.by(()=>{
    let foodArray:FoodComposition[]=[];
    for (let index = 0; index < choosenCarbohydrateFood.length; index++) {
      let quantityNeeded = roundTwo(carbohydratesEnergyNeed / rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["kcal"] * 1000 / choosenCarbohydrateFood.length);
      foodArray.push( {
        "name":rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["title"],
        "quantity":quantityNeeded,
        "protein":(rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["protein"]*quantityNeeded/100),
        "kcal":(rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["kcal"]*quantityNeeded/1000),
        "calcium":0,
        "phosphorus":0
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });
  /**************************** Données pour les Aliments Minéraux Vitamines ****************************/
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

<div class="row">

  <div class="col-6">
    <h3>Composition des sources d'aliment</h3>
    <span class="titleContent">Protéines : </span>
    <RangeDistribution range={proteinRange} bind:distribution={proteinDistribution}/>
    70g / 80g
    <FoodList list={rawAlimentList.protein} bind:choosenFood={choosenProteinFood} compositionFood={proteinCompositionFood}/>
    <!-- <FoodAndQuantityList list={rawAlimentList.protein} bind:choosenFood={proteinList} need={proteinNeed} nutriment="protein"/> -->
    <div></div>
    
    <span class="titleContent">Légumes verts : </span>
    <RangeDistribution range={greenVegetableRange} bind:distribution={greenVegetableDistribution}/>
    <FoodList list={rawAlimentList.greenVegetable} bind:choosenFood={choosenGreenVegetableFood} compositionFood={greenVegetableCompositionFood}/>
    
    <div></div>
    
    <span class="titleContent">Huile : </span>
    <RangeDistribution range={oilRange} distribution={oilDistribution}/>
    <FoodList list={rawAlimentList.oil} bind:choosenFood={choosenOilFood} compositionFood={oilCompositionFood}/>
    <div></div>
    
    <span class="titleContent">Glucides : </span>
    <FoodList list={rawAlimentList.carbohydrate} bind:choosenFood={choosenCarbohydrateFood} compositionFood={carbohydrateCompositionFood}/>
    
    <div></div>
    
    <span class="titleContent">AMV (Aliment Mineraux Vitamine)</span>
    <ul>
      <li>Calcium</li>
    </ul>
    
  </div>

  <div class="col-6">
    <ResumeNutritionalIntake {proteinCompositionFood} {greenVegetableCompositionFood} {oilCompositionFood} {carbohydrateCompositionFood} />
  </div>

</div>