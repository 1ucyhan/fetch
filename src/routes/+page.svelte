<script>
	import Dropdown from '../components/Dropdown.svelte';
	let doggies = [];

	// Fetching images.
	async function fetchImages(breed) {
		const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
		const data = await res.json();
		doggies = data.message.slice(0, 10); 
	}

	// Fetching the image / the breed selection
	function fetchBreeds(event) {
		const selectedBreed = event.detail;
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
	<div class="flex flex-col justify-center items-center pt-[10%]">
		<h1 class = "text-6xl font-extrabold text-fetchpurple animate__animated animate__rotateInUpRight"> 
			<span class = "text-fetchorange animate__animated animate__rotateInUpRight"> Fetch </span> 
			me a doggy. 🐶 </h1>
		<p class = "pb-10  pt-8 text-color-black"> Click on the dropdown below to see some cute doggies... </p>
		<!-- Dropdown -->
		<Dropdown on:select={fetchBreeds} />

	</div>
	<!-- Displaying the selected breed -->
	<div class="grid grid-cols-3 gap-4 mt-10">
		{#each doggies as image}
			<img src={image} alt="Dog image" class="w-full h-auto" />
		{/each}
	</div>

</section>


