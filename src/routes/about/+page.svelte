<script lang="ts">
    import { onMount } from "svelte";

  // First, initialize an array that will display the images that we want to fetch.
  let randomImages: string[] = [];


  onMount(async() => {
    // Get the result and turn it into JSON data.
    const res = await fetch('https://dog.ceo/api/breeds/image/random/3');
    const data = await res.json();

    // Getting the images.
    console.log("testing on mount data ", data);
    randomImages = data.message;
    console.log("testing on mount images ", randomImages);
  })

  async function getRandomImages() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/3');
    const data = await res.json();

    // Getting the images.
    console.log("testing on mount data ", data);
    randomImages = data.message;
    console.log("testing on mount images ", randomImages);
  }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="text-column g-10">
  <h1>About this app</h1>
  <p class="text-xl text-center font-bold">
    🐶 A take-home coding assessment for 
    <span class="font-black text-fetchorange">Fetch.</span>
  </p>
  <p>
    Used Dog API to view an image gallery of your favorite dog breeds. You can select one or more if you're a dog lover like me!
  </p>
  <p>
    Built with Svelte, Tailwind CSS (and some vanilla CSS where needed), and TypeScript. By far one of the most fun coding take-homes I've done. One of my new favorite dogs is now a Cockapoo!
  </p>
  <div class = "random">
    <p class="text-xl text-center font-bold mt-10">
      🐶 SURPRISE! You deserve some random doggies.
    </p>

    <div class = "flex justify-center mb-10">
      <button on:click={getRandomImages} class="scroll-btn w-fit">
        Give me doggies
      </button>
    </div>

    <div class = "flex flex-row gap-3">
      {#each randomImages as dog_img}
        <img src={dog_img} alt="A random doggy!" class="rounded-md border border-gray-300" />
      {/each}
    </div>
  </div>
</div>



<style>
	p {
		margin-bottom: 20px;
	}

  img {
    width: 100%; 
    max-width: 250px;
    height: 200px;
    object-fit: cover; 
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
  }

  button {
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

  button:hover {
    background-color: #faa819;
    color: #62185c;
  }
</style>
