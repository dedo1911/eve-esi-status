<script>
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte';
	import Stats from '../components/Stats.svelte';
	import Endpoint from '../components/Endpoint.svelte';

	export let data;
	let filter = '';

	onMount(() => {
    const interval = setInterval(() => {
      invalidate('app:esistatus');
    }, 30 * 1E3);
    return () => clearInterval(interval);
  });

</script>

<div class="container h-full mx-auto flex flex-col items-center">
	{#if data.err}
			<p>{data.err}</p>
	{:else}
		<div class="flex flex-col w-full content-start items-center space-y-2 mt-2">
			<Stats esi={data.esi} updatedAt={data.updateDate} />
			<div class="card p-4 w-full max-w-sm">
				<input type="text" class="input rounded-lg p-2" bind:value={filter} placeholder="Search..." />
			</div>
			{#each [ ...new Set(data.esi.map(e => e.tags[0])) ] as endpointGroup }
				<Endpoint esi={data.esi} {endpointGroup} {filter} />
			{/each}
		</div>
	{/if}
</div>
