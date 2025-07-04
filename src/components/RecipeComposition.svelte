<script lang="ts">
  import RangeDistribution from "./RangeDistribution.svelte"
  import FoodList from "./FoodList.svelte"
  import ResumeNutritionalIntake from "./ResumeNutritionalIntake.svelte"

  import RecipeSummary from "./RecipeSummary.svelte"

  import {roundTwo} from "$lib/index"
  import {type FoodComposition} from "$lib/types"

  // Récupération des informations calculées du globalInfo
  let {proteinNeed, energyNeed, calciumNeed} = $props()

  // Récupération de la base de données globales des aliments
  const rawAlimentList={
    "protein":
    [
      {"title":"Viande hachée cuite 5%", "kcal":1550, "protein":25.5, "calcium":7, "phosphorus":180},
      {"title":"Viande hachée cuite 15%", "kcal":2390, "protein":23.6, "calcium":15, "phosphorus":198},
      {"title":"Filet de poulet cru", "kcal":1100, "protein":23.4, "calcium":3.3, "phosphorus":240},
      {"title":"Saumon élevage cru", "kcal":1940, "protein":20.5, "calcium":5.84, "phosphorus":181},
      {"title":"Poisson blanc", "kcal":825, "protein":18.8, "calcium":14.5, "phosphorus":207},
      {"title":"Filet de poulet cuit", "kcal":1410, "protein":30.1, "calcium":4.7, "phosphorus":270},
    ],
    "greenVegetable":[
      {"title":"Haricots Verts, surgelé, cuit", "kcal":363, "protein":1.95, "calcium":51, "phosphorus":29},
      {"title":"Courgettes", "kcal":155, "protein":0.93, "calcium":19.3, "phosphorus":65},
      {"title":"Haricots verts en boîte", "kcal":231, "protein":1.33, "calcium":42.7, "phosphorus":25.3},
    ],
    "oil":[
      {"title":"Huile d'Olive", "kcal":9000, "protein":0, "calcium":0, "phosphorus":0},
    ],
    "carbohydrate":[
      {"title":"Riz Blanc, cuit, non salé", "kcal":1440, "protein":2.92, "calcium": 14, "phosphorus":35},
      {"title":"Pâtes standard, cuite, non salée", "kcal":1250, "protein":4.28, "calcium": 17, "phosphorus":59},
      {"title":"Patate", "kcal":805, "protein":1.08, "calcium": 5.83, "phosphorus":37.2},
      {"title":"Riz complet, cuit, non salé", "kcal":1570, "protein":3.21, "calcium":13, "phosphorus":120},
      {"title":"Riz Blanc, cru", "kcal":3500, "protein":7.04, "calcium": 33, "phosphorus":118},
      {"title":"Riz complet, cru", "kcal":3490, "protein":7.02, "calcium":11.1, "phosphorus":163},
    ],
    "amv":[
      {"title":"Calcidia", "kcal":0, "protein":0, "calcium": 154000, "phosphorus":0},
      {"title":"Vit'i5 Orange", "kcal":0, "protein":0, "calcium": 15000, "phosphorus":5000},
      {"title":"Vit'i5 Bleu", "kcal":0, "protein":0, "calcium": 10000, "phosphorus":1000},

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
        "calcium":(rawAlimentList["protein"][choosenProteinFood[index]]["calcium"]*quantityNeeded/100000),
        "phosphorus":(rawAlimentList["protein"][choosenProteinFood[index]]["phosphorus"]*quantityNeeded/100000)
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
        "calcium":(rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["calcium"]*quantityNeeded/100000),
        "phosphorus":(rawAlimentList["greenVegetable"][choosenGreenVegetableFood[index]]["phosphorus"]*quantityNeeded/100000)
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });

  /**************************** Données pour les huiles ****************************/
  const oilRange={min:0, max:20};
  let oilDistribution = $state(5);
  let oilNeedQuantity = $derived( energyNeed * oilDistribution / 100); 

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
        "calcium":(rawAlimentList["oil"][choosenOilFood[index]]["calcium"]*quantityNeeded/100000),
        "phosphorus":(rawAlimentList["oil"][choosenOilFood[index]]["phosphorus"]*quantityNeeded/100000)
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });

  /**************************** Données pour les glucides ****************************/
  let carbohydratesEnergyNeed:number = $derived.by(()=>{
    let energyAvailable:number = 0;
    for (let index = 0; index < proteinCompositionFood.length; index++) {
      energyAvailable += proteinCompositionFood[index]["kcal"];
    }
    for (let index = 0; index < greenVegetableCompositionFood.length; index++) {
      energyAvailable += greenVegetableCompositionFood[index]["kcal"];
    }
    for (let index = 0; index < oilCompositionFood.length; index++) {
      energyAvailable += oilCompositionFood[index]["kcal"];
    }
    return energyNeed - energyAvailable;
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
        "calcium":(rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["calcium"]*quantityNeeded/100000),
        "phosphorus":(rawAlimentList["carbohydrate"][choosenCarbohydrateFood[index]]["phosphorus"]*quantityNeeded/100000)
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });
  /**************************** Données pour les Aliments Minéraux Vitamines ****************************/
  let amvCalciumNeed:number = $derived.by(()=>{
    let calciumAvailable:number = 0;
    for (let index = 0; index < proteinCompositionFood.length; index++) {
      calciumAvailable += proteinCompositionFood[index]["calcium"];
    }
    for (let index = 0; index < greenVegetableCompositionFood.length; index++) {
      calciumAvailable += greenVegetableCompositionFood[index]["calcium"];
    }
    for (let index = 0; index < oilCompositionFood.length; index++) {
      calciumAvailable += oilCompositionFood[index]["calcium"];
    }
    for (let index = 0; index < carbohydrateCompositionFood.length; index++) {
      calciumAvailable += carbohydrateCompositionFood[index]["calcium"];
    }
    return calciumNeed - calciumAvailable;
  })
  let choosenAMVFood:number[]=$state([]);
  let amvCompositionFood:FoodComposition[]=$derived.by(()=>{
    let foodArray:FoodComposition[]=[];
    for (let index = 0; index < choosenAMVFood.length; index++) {
      let quantityNeeded = roundTwo(amvCalciumNeed / rawAlimentList["amv"][choosenAMVFood[index]]["calcium"] * 100000 / choosenAMVFood.length);
      foodArray.push( {
        "name":rawAlimentList["amv"][choosenAMVFood[index]]["title"],
        "quantity":quantityNeeded,
        "protein":(rawAlimentList["amv"][choosenAMVFood[index]]["protein"]*quantityNeeded/100),
        "kcal":(rawAlimentList["amv"][choosenAMVFood[index]]["kcal"]*quantityNeeded/1000),
        "calcium":(rawAlimentList["amv"][choosenAMVFood[index]]["calcium"]*quantityNeeded/100000),
        "phosphorus":(rawAlimentList["amv"][choosenAMVFood[index]]["phosphorus"]*quantityNeeded/100000)
      });
    }
    // foodCompositionList.set();
    return foodArray;
  });
</script>

<style>
  /* .sectionContainer{
    border:solid grey 1px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px grey;
    padding: 8px;
    margin: 20px 0px;
  } */
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
    <FoodList list={rawAlimentList.protein} bind:choosenFood={choosenProteinFood} compositionFood={proteinCompositionFood}/>
    <!-- <FoodAndQuantityList list={rawAlimentList.protein} bind:choosenFood={proteinList} need={proteinNeed} nutriment="protein"/> -->
    <div></div>
    
    <span class="titleContent">Légumes verts : </span>
    <RangeDistribution range={greenVegetableRange} bind:distribution={greenVegetableDistribution}/>
    <FoodList list={rawAlimentList.greenVegetable} bind:choosenFood={choosenGreenVegetableFood} compositionFood={greenVegetableCompositionFood}/>
    
    <div></div>
    
    <span class="titleContent">Huile : </span>
    <RangeDistribution range={oilRange} bind:distribution={oilDistribution}/>
    <FoodList list={rawAlimentList.oil} bind:choosenFood={choosenOilFood} compositionFood={oilCompositionFood}/>
    <div></div>
    
    <span class="titleContent">Glucides : </span>
    <FoodList list={rawAlimentList.carbohydrate} bind:choosenFood={choosenCarbohydrateFood} compositionFood={carbohydrateCompositionFood}/>
    
    <div></div>
    
    <span class="titleContent">AMV (Aliment Mineraux Vitamine)</span>
    <FoodList list={rawAlimentList.amv} bind:choosenFood={choosenAMVFood} compositionFood={amvCompositionFood}/>
    
  </div>

  <div class="col-6">
    <ResumeNutritionalIntake {proteinCompositionFood} {greenVegetableCompositionFood} {oilCompositionFood} {carbohydrateCompositionFood} {amvCompositionFood} />
  </div>

  <div class="col-12">
    <RecipeSummary {proteinCompositionFood} {greenVegetableCompositionFood} {oilCompositionFood} {carbohydrateCompositionFood} {amvCompositionFood} />
  </div>

</div>