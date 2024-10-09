<script>
	import { formatRelative } from 'date-fns'
	import { nb as nbLocale } from 'date-fns/locale'
	import EyeOpenIcon from 'lucide-svelte/icons/eye'
	import EyeClosedIcon from 'lucide-svelte/icons/eye-off'
	import { cn } from '$lib/utils.js'
	let className = undefined
	export { className as class }
	export let assessments
	export let editFunction
</script>

<td
	class={cn('text-wrap-2 whitespace-nowrap p-4 align-top text-foreground', className)}
	{...$$restProps}
>
	{#if assessments}
		<ul>
			{#each assessments as assessment}
				<li
					class="mb-2 flex items-center justify-between rounded bg-green-700 px-2 py-1 text-white"
				>
					<div class="flex items-center space-x-2">
						<span>{assessment.assessmentFormat.title}</span>
						<span class="text-sm font-light text-white">-</span>
						<span class="text-sm font-light text-white">
							{formatRelative(assessment.created_at, new Date(), {
								locale: nbLocale,
							})}
						</span>
					</div>
					<span>
						{#if assessment.isVisibleToStudent}
							<EyeOpenIcon class="h-4 w-4 text-gray-300" />
						{:else}
							<EyeClosedIcon class="h-4 w-4 text-gray-300" />
						{/if}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
	<button
		on:click={editFunction()}
		class="transform rounded border border-gray-600 px-2 pb-2 pt-1 text-sm text-gray-600 transition hover:bg-green-700 hover:text-white"
	>
		Ny vurdering
	</button>
</td>
