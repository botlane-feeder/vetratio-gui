<script>
  import 'bootstrap/dist/css/bootstrap.min.css';

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