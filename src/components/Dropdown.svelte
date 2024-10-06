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

    // Want to oragnize the checkboxes in alphabetical order.
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
  </script>
  
  <!-- Rendering the checkboxes for each breed. -->
  <div class="checkbox-container">
    {#each Object.keys(alphaBreeds) as letter}
      <div class="breed-group">
        <h3>{letter}</h3>
        {#each alphaBreeds[letter] as breed}
          <label class="breed-checkbox">
            <input
              type="checkbox"
              value={breed}
              on:change={(event) => handleCheckboxChange(event, breed)}
            />
            {breed}
          </label>
        {/each}
      </div>
    {/each}
  </div>
  
  <!-- Rendering the images of just the selected breeds -->
  <div>
    {#each Object.keys(breedImages) as breed}
      <h2 class = "text-fetchorange">{breed}</h2>
      <div class="grid grid-cols-3 gap-4 mt-10">
        {#each breedImages[breed] as image}
          <img src={image} alt={breed} />
        {/each}
      </div>
    {/each}
  </div>
  
  <style>

    .checkbox-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* Three columns */
        gap: 1rem;
        max-width: 100%;
    }

    .breed-group {
        margin-bottom: 1rem;
    }

    .breed-checkbox {
        display: block;
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