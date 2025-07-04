<script>
  import "../styles/variables.css"

  let { children } = $props();

</script>

<style>
  div{
    margin: 20px;
  }
</style>

<div>
  {@render children()}
</div>