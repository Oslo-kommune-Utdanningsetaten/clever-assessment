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
	<h2 class="text-3xl font-bold md:text-4xl">
		Undervisningsgruppe: {teachingGroup.displayName}
	</h2>
	<div class="space-y-6">
		<h2 class="text-3xl font-bold md:text-3xl">Vurderingssituasjoner</h2>

		<div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<table class="min-w-full shadow-md">
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

	<div class="space-y-6">
		<h2 class="text-3xl font-bold md:text-3xl">Elevene</h2>
		<div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<table class="min-w-full shadow-md">
				<thead>
					<tr>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Navn</th
						>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Role</th
						>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Antall vurderinger</th
						>
						<th
							class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Vurderingssituasjoner</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#if teachingGroup?.students?.length}
						{#each teachingGroup.students as student}
							<tr>
								<td class="whitespace-nowrap px-6 py-4">{student.name}</td>
								<td class="whitespace-nowrap px-6 py-4">{student.role}</td>
								<td class="whitespace-nowrap px-6 py-4">2</td>
								<td class="whitespace-nowrap px-6 py-4"
									><ul>
										<li>noen</li>
										<li>punkter</li>
									</ul></td
								>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>
