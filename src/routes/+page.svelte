<script>
	import logo from '$lib/images/fetch-logo.svg';
	import TypingEffect from '../components/TypingEffect.svelte';
	import Dictionary from '../components/Dictionary.svelte';
	import github from '$lib/images/github.svg';
	import lucy from '$lib/images/lucy-logo.svg';
	let doggies = [];
	
    const breeds = ["doggy", "Cockapoo", "Corgi", "Poodle", "Bulldog", "Sheepdog", "Newfoundland"];

	// Fetching images.
	async function fetchImages(breed) {
		const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
		const data = await res.json();
		doggies = data.message.slice(0, 6); 
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
		<h1 class="text-6xl text-fetchpurple flex items-center">
			<span class="text-fetchorange animate__animated animate__fadeIn flex items-center">
				Fetch
				<img 
					src="{logo}" 
					alt="Fetch Logo" 
					class="inline-block w-20 h-20 ml-2 align-middle"
				/>
			</span>
			<span class="ml-2">
				me a <TypingEffect words={breeds} />. 🐶
			</span>
		</h1>
		
		<p class = "pb-5 text-color-black"> choose one, or, if you're like a dog enthuasist like me, search up multiple! 🐶</p>
		<div class = "flex flex-row gap-x-3">
			<a href="https://github.com/sveltejs/kit">
				<img src={github} alt="GitHub" width=30px/>
			</a>
			<a href="https://hanluxi.com/">
				<img src={lucy} alt="lucy-logo" width=28px />
			</a>
		</div>
		
		<Dictionary on:select={fetchBreeds} />
		
	</div>

</section>

