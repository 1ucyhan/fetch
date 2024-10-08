<script lang="ts">
  // onMount to execute after the component renders to the DOM
  import { onMount } from 'svelte';
  // Array to store all of the breeds from the DogAPI.
  let breeds: string[] = [];
  // Array to store only the breeds that the user selects.
  let selectedBreeds: string[] = [];
  // Array to store the images of each breed.
  let breedImages: { [key: string]: string[] } = {};
  // Array that stores the breeds in alphabetical order (for checkbox sorting).
  let alphaBreeds: { [key: string]: string[] } = {};
  // Initializing the search input.
  let searchTerm = '';
  // Boolean for showing when the down button appears.
  let showDownButton = false;

  /* DICTIONARY */
  // Fetching all the dog breeds from the DogAPI on mount.
  onMount(async () => {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    breeds = Object.keys(data.message);
    // Grouping them alphabetically.
    groupBreedsByLetter();
  });

  // Fetch (haha get it) and display images for the selected breeds
  async function fetchBreedImages() {
    breedImages = {};
    for (const breed of selectedBreeds) {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await res.json();
      // Only displaying the first 6 breed images. Don't want to overcrowd.
      breedImages[breed] = data.message.slice(0, 6); 
    }
  }

  // Handling the changes in the checkboxes.
  function handleCheckboxChange(event: Event, breed: string) {
    const target = event.target as HTMLInputElement | null; 
    if (target && target.checked) {
      // Adding breed once it's selected.
      selectedBreeds.push(breed);
    } else if (target) {
      selectedBreeds = selectedBreeds.filter(selectedBreed => selectedBreed !== breed);
    }

    showDownButton = selectedBreeds.length > 0;
    fetchBreedImages();
  }

  // Grouping the breeds alphabetically to organize the checkboxes.
  function groupBreedsByLetter() {
      alphaBreeds = {};
      breeds.forEach(breed => {
        let firstLetter: string = breed.charAt(0).toUpperCase();
        if (!alphaBreeds[firstLetter]) {
            alphaBreeds[firstLetter] = [];
        }
        // Adding that breed if it matches the first letter.
        alphaBreeds[firstLetter].push(breed);
      });
  }

  // Fucntion to scroll to the images page.
  function scrollToImages() {
    const imagesSection = document.getElementById('dog-images');
    if (imagesSection) {
      imagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</svelte:head>

<!-- Rendering the checkboxes for each breed. -->
<div class="checkbox-container">
  <!-- Header and descrption for selecting doggies. -->
  <h1 class="text-2xl sm:text-4xl font-bold text-fetchpurple mb-4">The Big Dictionary of Doggies</h1>
  <p class="text-center w-full pb-10 font-bold mt-0 animate__animated animate__tada">When you're done selecting, <span class="font-800">scroll down</span> to see your doggies!</p>
  <!-- Search bar for filtering breeds. -->
  <input
      type="text"
      bind:value={searchTerm}
      placeholder="Search for a breed..."
      class="flex text-black placeholder:text-black items-center mx-auto mb-4 p-2 border border-fetchorange bg-fetchorange bg-opacity-50 rounded-lg w-full max-w-md"
  />
  <!-- Displaying all the checkboxes for each breed. -->
  <div class="checkboxes">
    {#each Object.keys(alphaBreeds) as letter}
      <div class="breed-group mb-1">
        <!-- Displaying LETTER, BREEDS. -->
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

<!-- Display the down button if the state is true! -->
{#if showDownButton}
  <button on:click={scrollToImages} class="scroll-btn">
    ↓ See my doggies!
  </button>
{/if}

<!-- Dog images section -->
<div id="dog-images">
  {#each Object.keys(breedImages) as breed}
    <h2 class="text-fetchorange text-3xl sm:text-5xl pb-0 pt-10">⤷ the {breed} 🐕</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      <!-- Displaying each image based on the breed. -->
      {#each breedImages[breed] as image}
        <img src={image} alt={breed} class="rounded-md border border-gray-300" />
      {/each}
    </div>
  {/each}
</div>

<style>
  /* Styling the scroll button */
  .scroll-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: #62185c;
    color: white;
    padding: 12px;
    border-radius: 10px;
    border: none;
    color: #F9F7F2;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .scroll-btn:hover {
    background-color: #faa819;
    color: #62185c;
  }

  /* Customizing the look of the section that contains all the checkbox. Included clip-path polygon. */
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

  /* Centering all the groups of checkboxes no matter the size of the screen. */
  .checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
    gap: 1rem;
    justify-content: center;
    max-width: 1000px; 
    margin: 0 auto;
    padding: 1rem;
  }

  /* Customizing each individual checkbox.  */
  .breed-checkbox {
    display: flex; 
    align-items: center; 
    gap: 0.3em;
    margin-bottom: 0.5rem;
  }

  /* Displaying the images. */
  img {
    width: 100%; 
    height: 300px;
    object-fit: cover; 
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
  }

  /* RESPONSIVENESS */
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
