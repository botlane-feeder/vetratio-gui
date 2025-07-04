<script lang="ts">
  import { type Writable } from "svelte/store";

  interface P {
    value: Writable<number>,
    range: {min:number, max:number, default:number},
    showInput:boolean
  }
  let { value=$bindable(), range, showInput=false } = $props();
</script>

<div class="container">
  <div>
    {#if showInput}
    <input type="number" bind:value={value} min={range["min"]} max={range["max"]}>
    {:else}
    {value}
    {/if}
    %</div>
  <input class="range" type="range" bind:value={value} min={range["min"]} max={range["max"]}>
</div>

<style>

  .container{ 
    position: relative;
    bottom: -12%;
    font-size: 16px;
    margin-inline: 10px 0px;
  }
  .container div{
    position: absolute;
    top:20%;
    left:50%;
    transform: translate(-50%, -100%);
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
     margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

</style>