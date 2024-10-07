<script>
	// Using the header component.
	import Header from '../components/Header.svelte';
	// Importing all the .css properties.
	import '../app.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css">
</svelte:head>

<div class="app">
	<!-- Contains header and the rest of the page's content. -->
	<Header />
	<main>
		<slot/>
	</main>
</div>

<style>
	/* Built in CSS from SvelteKit. */
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>
