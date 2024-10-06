<script>
  import { onMount } from 'svelte';
  
  let breeds = [];
  let selectedBreeds = [];
  let breedImages = {};
  let alphaBreeds = {};
  let searchTerm = '';

  // Fetch all the dog breeds on mount
  onMount(async () => {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    breeds = Object.keys(data.message);
    groupBreedsByLetter();
  });

  // Fetch and display images for the selected breeds
  async function fetchBreedImages() {
    breedImages = {};
    for (const breed of selectedBreeds) {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await res.json();
      breedImages[breed] = data.message.slice(0, 10); 
    }
  }

  // Handle changes in checkboxes
  function handleCheckboxChange(event, breed) {
    if (event.target.checked) {
      selectedBreeds.push(breed);
    } else {
      selectedBreeds = selectedBreeds.filter(selectedBreed => selectedBreed !== breed);
    }
    fetchBreedImages(); 
  }

  // Group breeds alphabetically
  function groupBreedsByLetter() {
      alphaBreeds = {};
      breeds.forEach(breed => {
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

<svelte:head>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</svelte:head>

<!-- Rendering the checkboxes for each breed -->
<div class="checkbox-container">

  <h1 class="text-2xl sm:text-4xl font-bold text-fetchpurple mb-4">The Big Dictionary of Doggies</h1>
  <p class="text-center w-full pb-10 font-bold mt-0 animate__animated animate__tada">When you're done selecting, <span class="font-800">scroll down</span> to see your doggies!</p>

  <!-- Search bar for filtering breeds -->
  <input
      type="text"
      bind:value={searchTerm}
      placeholder="Search for a breed..."
      class="flex text-black placeholder:text-black items-center mx-auto mb-4 p-2 border border-fetchorange bg-fetchorange bg-opacity-50 rounded-lg w-full max-w-md"
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

<!-- Rendering the images of selected breeds -->
<div>
  {#each Object.keys(breedImages) as breed}
    <h2 class="text-fetchorange text-3xl sm:text-5xl pb-0 pt-10">⤷ the {breed} 🐕</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
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

  /* Centering the checkboxes no matter the size of the screen */
  .checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
    gap: 1rem;
    justify-content: center;
    max-width: 1000px; 
    margin: 0 auto;
    padding: 1rem;
  }


  .breed-group {
    margin-bottom: 1rem;
  }

  .breed-checkbox {
    display: flex; 
    align-items: center; 
    gap: 0.3em;
    margin-bottom: 0.5rem;
  }

  img {
    width: 100%; 
    height: 300px;
    object-fit: cover; 
    border-radius: 8px;
    border: #62185c solid 3px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
  }

  @media (max-width: 640px) {
    img {
      height: 200px; 
    }
  }

  @media (min-width: 768px) {
      img {
        height: 300px; 
      }
  }

  /* Removing the clip-path for smaller screens. It covers too much fo the words */
  @media (max-width: 768px) {
    .checkbox-container {
      clip-path: none;
      padding-top: 10%; 
      padding-bottom: 10%;
    }
  }
</style>
