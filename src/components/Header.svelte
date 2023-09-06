<script>
  import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
  import { Orbit } from 'lucide-svelte';
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <Orbit size={32} strokeWidth={1} />  
  </svelte:fragment>
  <h2 class="h4">EVE Online ESI Status</h2>
  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
