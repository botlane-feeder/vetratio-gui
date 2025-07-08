<script lang=ts>
  import GlobalInfo from "$lib/components/GlobalInfo.svelte"
  import FoodComposition from "$lib/components/FoodComposition.svelte"
  import IngredientList from "$lib/components/IngredientList.svelte"
  import FoodIntake from "$lib/components/FoodIntake.svelte"

</script>
<svelte-head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <title>VetRatio</title>
</svelte-head>

<div class="container">
  <header>
    <h1>VetRatio</h1>
    <h2>Composition d'une ration alimentaire</h2>
    <div class="version">Version 1.0.0</div>
  </header>
  <main>
    <div class="composition">
      <FoodComposition />
    </div>
    <div class="column">
      <FoodIntake />
      <IngredientList />
    </div>
    <div class="globalInfo">
      <GlobalInfo />
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--background-color);
    color:var(--dark-color-font);
  }
  header{
    position: relative;
    text-align: center;
    max-width:600px;
    margin-inline: auto;
  }
  .version{
    position: absolute;
    bottom: 0px;
    right: -50px;
    text-align:right;
  }
  .container{
    max-width:1200px;
    margin-inline: auto;
    /* box-sizing: border-box; */
    
  }
  main{
    position: relative;
    
    background-color: var(--background-white);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 20px;

    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;

  }
  .composition{
    margin-inline: auto;
    padding: 20px;
  }
  .column{
    display: flex;
    max-width: 400px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
  }

  .globalInfo{
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(10%, 10%);
  }

  @media (max-width:600px){
    main{
      flex-direction: column;
      gap: 20px;
      /* justify-content: center; */
    }
    .version{
      right: 0px;
    }
  }
  
</style>