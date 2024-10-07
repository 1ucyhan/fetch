<!-- NOTE THAT THIS COMPONENT IS NOT BEING USED ANYMORE! This is simply for my reference for my past code.-->
<script lang="ts">
  // Importing elements from svelte.
  import { createEventDispatcher, onMount } from 'svelte';
  // Geting an array of all the breeds.
  let breeds: string[] = [];
  // Displaying the selected breed here.
  let selectedBreed = '';
  
  // Create a dispatch.
  const dispatch = createEventDispatcher();
  
  // Fetch (haha get it) all the dog breeds.
  // Make sure this is on Mount.
  onMount(async () => {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    console.log(Object.keys(data.message))
    breeds = Object.keys(data.message);
  });

  // Selecting the breed of the dog.
  function selectBreed(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      selectedBreed = target.value;
      dispatch('select', selectedBreed);
    }
  }
</script>

<!-- Displaying the selected values. -->
<select
  bind:value={selectedBreed}
  on:change={selectBreed}
  class="mt-4 p-2 rounded-xl border bg-fetchpurple text-white text-sm w-[200px] "
>
  <!-- Displaying each possible value. -->
  <option value="" disabled>Select a breed</option>
  {#each breeds as breed}
    <option value={breed}>{breed}</option>
  {/each}
</select>

  