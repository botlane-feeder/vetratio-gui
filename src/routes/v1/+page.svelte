<script lang=ts>
  import GlobalInfo from "$lib/components/GlobalInfo.svelte"
  import FoodComposition from "$lib/components/FoodComposition.svelte"
  import FoodIntake from "$lib/components/FoodIntake.svelte"



</script>

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
    <div class="intake">
      <FoodIntake />
    </div>
    <div class="globalInfo">
      <GlobalInfo />
    </div>
    <div class="ingredientList">
      Liste des ingrédients : 
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
  main{
    position: relative;
    
    max-width:1200px;
    margin-inline: auto;
    /* padding: 2rem; */

      
    background-color: var(--background-white);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  }
  .composition{
    padding: 0.5rem 5rem;
  }

  .intake{
    position: absolute;
    top: 0px;
    right: 0px;
    transform: translate(-10%, 10%);

  }
  .globalInfo{
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(10%, 10%);
  }
  
</style>