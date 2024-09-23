<script>
	import * as Card from '$ui/card'
	import { page } from '$app/stores'
	import { selectedTestUser } from '$lib/stores/userStore.js'

	export let data
	let { teachingGroup } = data

	$: {
		;({ teachingGroup } = data)
	}
</script>

<div class="container my-12 max-w-[1024px] space-y-12">
	<div class="space-y-6">
		<h1 class="text-3xl font-bold md:text-4xl">
			Vurderingssituasjoner i {teachingGroup.displayName}
		</h1>
		<pre>{JSON.stringify(teachingGroup, null, 2)}</pre>
		<div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<table class="min-w-full bg-white shadow-md">
				<thead>
					<tr>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Tittel</th
						>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Beskrivelse</th
						>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Format</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#if teachingGroup?.assessmentContexts?.length}
						{#each teachingGroup.assessmentContexts as assessmentContext}
							<tr>
								<td class="whitespace-nowrap px-6 py-4">{assessmentContext.title}</td>
								<td class="whitespace-nowrap px-6 py-4">{assessmentContext.description || ''}</td>
								<td class="whitespace-nowrap px-6 py-4"
									>{assessmentContext.assessmentFormats.map((af) => af.title).join(', ')}</td
								>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>
