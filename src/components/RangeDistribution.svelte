<script>
  let {range, distribution = $bindable()} = $props();
</script>

<style>
  span{
    display:inline-block;
    width: 60px;
    text-align: right;
  }
  .inline-range{
    display:inline;
    width:200px;
    padding-left:10px;
    padding-top:10px;
  }
</style>

<span>{distribution} %</span>
<input type="range" min={range.min} max={range.max} class="form-range inline-range" bind:value={distribution}>