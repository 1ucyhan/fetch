<script lang="ts">
	// Importing feature from Svelte.
	import { page } from '$app/stores';
	// Importing assets in lib folder.
	import logo from '$lib/images/fetch-logo.svg';
	import github from '$lib/images/github.svg';
	import lucy from '$lib/images/lucy-logo.svg';
</script>

<header class = "flex justify-between">
	<!-- Adding Fetch logo in the corner (because why not). -->
	<div class="corner">
		<a href="https://fetch.com/">
			<img src={logo} alt="Fetch Logo" />
		</a>
	</div>
	<!-- Navigation bar. -->
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">about</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<!-- Adding Github Repo link and website in the corner (because why not). -->
	<div class="corner">
		<div class = "flex flex-row gap-y-1">
			<a href="https://github.com/1ucyhan/fetch">
				<img src={github} alt="GitHub" />
			</a>
			<a href="https://hanluxi.com/">
				<img src={lucy} alt="lucy-logo" />
			</a>
		</div>
	</div>
</header>

<style>
	/* Customizing the corner sizes. */
	.corner {
		width: 3em;
		height: 3em;
	}

	/* Customizing the corner links. */
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	/* Customizing the corner images. */
	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	/* Nav bar customization */
	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	/* SVG customization. */
	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	/* Custom polygon shape. */
	path {
		fill: var(--background);
	}

	/* Properties to group each page link. */
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	/* Property for each value in the navigation bar (HOME, ABOUT) */
	li {
		position: relative;
		height: 100%;
	}

	/* CSS for the triangle on the top of the current navigation page.  */
	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	/* Customizing the links in the navigation bar (HOME, ABOUT). */
	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	/* Hovering property. */
	a:hover {
		color: var(--color-theme-1);
	}
</style>
