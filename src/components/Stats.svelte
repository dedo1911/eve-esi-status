<script>
	import { ShieldAlert, ShieldCheck, ShieldX } from "lucide-svelte";

  export let esi;
	export let updatedAt;

  let total = 0
	let green = 0
	let yellow = 0
	let red = 0
  $: total = esi.length
	$: green = esi.filter(e => e.status === 'green').length
	$: yellow = esi.filter(e => e.status === 'yellow').length
	$: red = esi.filter(e => e.status === 'red').length
</script>

<div class="card p-4 max-w-sm w-full">
	<div class="flex justify-between items-center">
		<span>Total Endpoints:</span>
		<span>{total}</span>
	</div>
	{#if green > 0}
	<div class="flex justify-between items-center text-success-500">
		<span><ShieldCheck strokeWidth={1} /> Online Endpoints:</span>
		<span>{green}</span>
	</div>
	{/if}
	{#if yellow > 0}
	<div class="flex justify-between items-center text-warning-500">
		<span><ShieldAlert strokeWidth={1} /> Degraded Endpoints:</span>
		<span>{yellow}</span>
	</div>
	{/if}
	{#if red > 0}
	<div class="flex justify-between items-center text-error-500">
		<span><ShieldX strokeWidth={1} /> Offline Endpoints:</span>
		<span>{red}</span>
	</div>
	{/if}
	<p class="text-center text-gray-400">Updated at: {updatedAt.toLocaleString()}</p>
</div>
