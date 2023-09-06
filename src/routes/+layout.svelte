<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '../components/Header.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<slot />
</AppShell>
