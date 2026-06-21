<script lang="ts">
	import { onMount } from 'svelte';
	import ContentCard from '$lib/components/ContentCard.svelte';
    import type { ContentCardProps } from '$lib/components/types';

	let count = 0;
	let busy = false;
	let blocks: Array<{ id: number; component: string; content: ContentCardProps }> = [];
	let loader: HTMLDivElement;
	let sentinel: HTMLDivElement;

	async function generate() {
		if (busy) return;
		busy = true;

		if (loader) {
			loader.style.display = 'block';
		}

		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					prompt: `Generate section ${count + 1}. Make it visually different from previous sections.`
				})
			});

			const data = await res.json();
			const content = JSON.parse(data.result);

			blocks = [
				...blocks,
				{
					id: count,
					component: content.componentType,
					content: content.props
				}
			];

			count++;
		} catch (err) {
			console.error(err);
		}

		if (loader) {
			loader.style.display = 'none';
		}

		busy = false;
	}

	onMount(() => {
		// Set up Intersection Observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						generate();
					}
				});
			},
			{
				rootMargin: '1000px' // Trigger 1000px before sentinel comes into view
			}
		);

		observer.observe(sentinel);

		// Generate initial content
		generate().then(() => generate());

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Scroll Generator — MVP</title>
</svelte:head>

<h1>Scroll Generator</h1>

<p class="subtitle">Scroll down to generate new content via AI.</p>

<div id="blocks">
	{#each blocks as block (block.id)}
		<div class="block">
			<div class="label">section {block.id + 1}</div>

			<ContentCard 
				{...block.content}
			/>
		</div>
	{/each}
</div>

<div id="loader" bind:this={loader}>generating...</div>

<div id="sentinel" bind:this={sentinel}></div>

<style>
	:global(body) {
		font-family: Georgia, serif;
		max-width: 680px;
		margin: 0 auto;
		padding: 40px 20px;
		background: #f9f9f9;
		color: #222;
		line-height: 1.8;
	}

	h1 {
		font-size: 1.6em;
		margin-bottom: 6px;
	}

	.subtitle {
		color: #888;
		font-size: 0.9em;
		margin-bottom: 40px;
	}

	.block {
		min-height: 100vh;
		padding: 30px 0;
		border-bottom: 1px solid #ddd;
	}

	.block p {
		margin-bottom: 16px;
	}

	.block .label {
		font-size: 0.75em;
		color: #bbb;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 12px;
	}

	#loader {
		text-align: center;
		padding: 40px;
		color: #aaa;
		font-style: italic;
		display: none;
	}
</style>
