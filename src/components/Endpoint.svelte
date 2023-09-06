<script>
    import { ChevronDownCircle, ChevronUpCircle } from "lucide-svelte";
    import { slide } from "svelte/transition";

  export let endpointGroup;
  export let esi;
  export let filter;

  let show = true
  let expanded = false
  let endpoints = []
  let online = 0

  $: show = filter.length === 0 || filter.length > 0 && (
    endpointGroup.toLocaleUpperCase().includes(filter.toLocaleUpperCase()) ||
    endpoints.filter(e => e.route.toLocaleUpperCase().includes(filter.toLocaleUpperCase())).length > 0
  )
  $: endpoints = esi.filter(e => e.tags[0] === endpointGroup)
  $: online = endpoints.filter(e => e.status === 'green').length
  $: expanded = endpoints.length != online
</script>

{#if show}
<div class="card px-6 py-4 max-w-2xl w-full flex flex-col space-y-2">
  <div class="flex justify-between">
    <h3 class="h3">
      {endpointGroup}
      <small class="text-sm {online === endpoints.length ? 'text-slate-500' : 'text-error-500'}">
        ({online} / {endpoints.length})
      </small>
    </h3>
    <button type="button" class="btn-icon {expanded ? 'open' : ''}" on:click={() => expanded = !expanded}>
      <ChevronUpCircle />
    </button>
  </div>
  {#if expanded}
    <div transition:slide>
    {#each endpoints as endpoint}
      <div class="flex flex-col md:flex-row justify-between items-start space-y-2">
        <p>
          <strong>{endpoint.method.toLocaleUpperCase()}</strong>
          <span class="text-slate-500">{endpoint.route}</span>
        </p>
        {#if endpoint.status === 'green'}
          <span class="chip variant-filled-success">ONLINE</span>
        {:else if endpoint.status === 'yellow'}
          <span class="chip variant-filled-warning">DEGRADED</span>
        {:else if endpoint.status === 'red'}
          <span class="chip variant-filled-error">OFFLINE</span>
        {:else}
        <span class="chip variant-filled-tertiary">UNKNOWN</span>
        {/if}
      </div>
    {/each}
    </div>
  {/if}
</div>
{/if}

<style>
  button {
    transition: transform ease-in-out 250ms;
  }
  button.open {
    transform: rotate(180deg);
  }
</style>