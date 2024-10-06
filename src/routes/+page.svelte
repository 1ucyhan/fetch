<script>
	import Dropdown from '../components/Dropdown.svelte';
	let dogImages = [];

	// Fetch images when a breed is selected
	async function fetchImages(breed) {
		const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
		const data = await res.json();
		dogImages = data.message.slice(0, 10); // Display the first 10 images
	}

	// Handle the breed selection
	function handleBreedSelect(event) {
		const selectedBreed = event.detail; // The breed selected from the dropdown
		fetchImages(selectedBreed);
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</svelte:head>

<section>
	<div class="flex flex-col justify-center items-center pt-[20%]">
		<h1 class = "text-6xl font-extrabold text-fetchpurple animate__animated animate__rotateInUpRight"> 
			<span class = "text-fetchorange animate__animated animate__rotateInUpRight"> Fetch </span> 
			me a doggy. 🐶 </h1>
		<p class = "pt-8 text-color-black"> Click on the dropdown below to see some cute doggies... </p>
		<Dropdown on:select={handleBreedSelect} />
	

	<!-- Dropdown -->

	<!-- Displaying the selected breed -->
	</div>

	<div class="grid grid-cols-3 gap-4 mt-8">
		{#each dogImages as image}
			<img src={image} alt="Dog image" class="w-full h-auto" />
		{/each}
	</div>

</section>


  

<style>
	
</style>
