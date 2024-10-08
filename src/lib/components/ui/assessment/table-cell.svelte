<script>
	import { format, formatDistance, formatRelative, subDays } from 'date-fns'
	import CreateIcon from 'lucide-svelte/icons/square-plus'
	import DeleteIcon from 'lucide-svelte/icons/trash-2'
	import { cn } from '$lib/utils.js'
	let className = undefined
	export { className as class }
	export let assessments
	export let editFunction
	export let deleteFunction
</script>

<td
	class={cn('text-wrap-2 whitespace-nowrap px-6 py-4 align-top text-foreground', className)}
	{...$$restProps}
>
	{#if assessments}
		<ul>
			{#each assessments as assessment}
				<li>
					{assessment.assessmentFormat.title}
					<span class="text-sm font-light text-gray-400">
						- {formatDistance(assessment.created_at, new Date(), { addSuffix: true })}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
	<button
		on:click={editFunction()}
		class="mt-2 transform rounded border px-2 text-gray-600 transition hover:bg-green-500"
	>
		Ny vurdering
	</button>
</td>
