<script>
	import { enhance } from '$app/forms'
	import { formatRelative } from 'date-fns'
	import { nb as nbLocale } from 'date-fns/locale'
	import { fly } from 'svelte/transition'
	import EyeOpenIcon from 'lucide-svelte/icons/eye'
	import EyeClosedIcon from 'lucide-svelte/icons/eye-off'
	import TrashIcon from 'lucide-svelte/icons/trash-2'
	import PencilIcon from 'lucide-svelte/icons/file-pen-line'

	import { cn } from '$lib/utils.js'
	let className = undefined
	export { className as class }
	export let assessments
	export let createFunction
	export let editFunction
	export let isDeleteEnabled
	export let student
	export let assessmentContext
</script>

<td
	class={cn('text-wrap-2 whitespace-nowrap p-4 align-top text-foreground', className)}
	{...$$restProps}
>
	{#if assessments}
		<ul>
			{#each assessments as assessment}
				<li
					class="mb-2 flex items-center justify-between rounded bg-green-600 py-1 pl-2 pr-1 text-white"
					in:fly={{ y: 20, duration: 300 }}
					out:fly={{ y: -20, duration: 300 }}
				>
					<div class="items-left flex space-x-1 pr-2 text-sm">
						<span>{assessment.assessmentFormat.title}</span>
						<span class="font-light text-white">-</span>
						<span class="font-light text-white">
							{formatRelative(assessment.created_at, new Date(), {
								locale: nbLocale,
							})}
						</span>
					</div>
					<div class="flex items-center space-x-2">
						<span title="{assessment.isVisibleToStudent ? 'S' : 'Ikke s'}ynlig for eleven">
							{#if assessment.isVisibleToStudent}
								<EyeOpenIcon class="h-4 w-4 text-gray-300" />
							{:else}
								<EyeClosedIcon class="h-4 w-4 text-gray-300" />
							{/if}
						</span>
						<span title="Rediger denne vurderingen">
							<button
								type="submit"
								class="rounded p-2 text-white hover:bg-white hover:text-green-600"
								on:click={editFunction({ student, assessmentContext, assessment })}
							>
								<PencilIcon class="h-4 w-4" />
							</button>
						</span>
						<span title="Slett denne vurderingen">
							{#if isDeleteEnabled}
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="action" value="delete" />
									<input type="hidden" name="assessmentId" value={assessment.id} />
									<button type="submit" class="rounded p-2 text-white hover:bg-red-700">
										<TrashIcon class="h-4 w-4" />
									</button>
								</form>
							{/if}
						</span>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
	<button
		on:click={() => createFunction({ student, assessmentContext })}
		title="Opprett en ny vurdering"
		class="transform rounded border border-gray-600 px-2 pb-2 pt-1 text-sm text-gray-600 transition hover:bg-green-600 hover:text-white"
	>
		Ny vurdering
	</button>
</td>
