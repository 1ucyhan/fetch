<script>
    import { createEventDispatcher, onMount } from 'svelte';
    let breeds = [];
    let selectedBreed = '';
  
    // Create a dispatch.
    const dispatch = createEventDispatcher();
  
    // Fetch (haha get it) all the dog breeds.
    // Make sure this is on Mount
    onMount(async () => {
      const res = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await res.json();
      console.log(Object.keys(data.message))
      breeds = Object.keys(data.message);
    });

    // Selecting the breed of the dog
    function selectBreed(event) {
      selectedBreed = event.target.value;
      dispatch('select', selectedBreed);
    }
  </script>
  
  <select
    bind:value={selectedBreed}
    on:change={selectBreed}
    class="mt-4 p-2 rounded-xl border bg-fetchpurple text-white text-sm w-[200px] "
  >
    <option value="" disabled>Select a breed</option>
    {#each breeds as breed}
      <option value={breed}>{breed}</option>
    {/each}
</select>

  