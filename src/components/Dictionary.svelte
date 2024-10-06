<script>
    import { onMount } from 'svelte';
    
    /**
     * @type {any[]}
     */
    let breeds = [];
    /**
     * @type {any[]}
     */
    let selectedBreeds = [];
    let breedImages = {};
    let alphaBreeds = {};
    let searchTerm = '';

    // Fetch (haha get it) all the dog breeds on mount
    // Make sure this is on Mount
    onMount(async () => {
      const res = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await res.json();
      console.log(Object.keys(data.message))
      breeds = Object.keys(data.message);
      groupBreedsByLetter();
    });

    // Fetch and display images for the selected breeds
    async function fetchBreedImages() {
      breedImages = {};
      for (const breed of selectedBreeds) {
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await res.json();
        // Don't want to overload.
        // We just want 10 images per breed.
        // @ts-ignore
        breedImages[breed] = data.message.slice(0, 10); 
      }
    }

    // Making sure any changes in checkboxes are reflected.
    function handleCheckboxChange(event, breed) {
      // Selecting multiple breeds of dogs
      if (event.target.checked) {
        selectedBreeds.push(breed);
      } else {
        selectedBreeds = selectedBreeds.filter(selectedBreed => selectedBreed !== breed);
      }
      fetchBreedImages(); 
    }

    // Want to organize the checkboxes in alphabetical order.
    function groupBreedsByLetter() {
        alphaBreeds = {};
        breeds.forEach(breed => {
            // Get the first letter of every breed. Sees if it matches
            const firstLetter = breed.charAt(0).toUpperCase();
            if (!alphaBreeds[firstLetter]) {
                alphaBreeds[firstLetter] = [];
            }
            alphaBreeds[firstLetter].push(breed);
        });
    }

    // Filter breeds based on search term
    $: filteredBreeds = breeds.filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase()));
</script>

<!-- Rendering the checkboxes for each breed -->
<div class="checkbox-container">
    <h1 class="text-2xl font-bold text-gray-800 mb-4"> The Big Dictionary of Doggies </h1>

    <!-- Search bar for filtering breeds -->
    <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search for a breed..."
        class="flex items-center mx-auto center mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-md"
    />

    <div class="checkboxes">
        {#each Object.keys(alphaBreeds) as letter}
        <div class="breed-group">
            <h3 class="text-xl text-fetchpurple">{letter}</h3>
            {#each alphaBreeds[letter].filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase())) as breed}
            <label class="breed-checkbox">
                <input
                    type="checkbox"
                    value={breed}
                    on:change={(event) => handleCheckboxChange(event, breed)}
                    class="mr-2"
                />
                {breed}
            </label>
            {/each}
        </div>
        {/each}
    </div>
</div>

<!-- Rendering the images of just the selected breeds -->
<div>
    {#each Object.keys(breedImages) as breed}
      <h2 class="text-fetchorange">{breed}</h2>
      <div class="grid grid-cols-3 gap-4 mt-10">
        {#each breedImages[breed] as image}
          <img src={image} alt={breed} class="rounded-md border border-gray-300" />
        {/each}
      </div>
    {/each}
</div>


<style>
    .checkbox-container {
        margin-top: 0;
        position: relative;
        width: 100vw;
        min-height: 600px; 
        background-color: #f3f0ec;
        padding-top: 20%;
        padding-bottom: 10%;
        clip-path: polygon(0 10%, 100% 0%, 100% 90%, 0% 100%); 
        overflow: hidden; 
    }

    .checkboxes {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        max-width: 1000px; 
        margin: 0 auto;
        padding: 1rem;
    }

    .breed-group {
        margin-bottom: 1rem;
        max-width: 30%;
    }

    .breed-checkbox {
        display: flex; 
        align-items: center; 
        gap: 0.3em;
        margin-bottom: 0.5rem;
    }

    img {
        width: 80%; 
        height: 200px;
        object-fit: cover; 
        border-radius: 8px;
        border: 2px solid orange;
    }

</style>