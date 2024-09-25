<script>
	import { cn } from '$lib/utils.js'
	let className = undefined
	export { className as class }
	export let assessment
	export let editFunction

	// {assessment ? 'bg-emerald-100' : 'bg-red-100'}
</script>

<td
	class={cn('text-wrap-2 whitespace-nowrap px-6 py-4 text-foreground', className)}
	{...$$restProps}
>
	{#if assessment}
		{assessment.id}
	{:else}
		<button
			on:click={editFunction()}
			class="text-blue-900 no-underline underline-offset-4 hover:underline"
		>
			Opprett
		</button>
	{/if}
</td>
