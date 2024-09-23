<script>
	import * as Card from '$ui/card'
	import { Button } from '$ui/button'
	import { Separator } from '$ui/separator'
	import { page } from '$app/stores'
	import { selectedTestUser } from '$lib/stores/userStore.js'

	export let data

	const assessments = [
		{
			title: 'Fint',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			href: ''
		},
		{
			title: 'Noe mer',
			description: 'Dolor sit amet, consectetur adipiscing elit.',
			href: ''
		},
		{
			title: 'En annen vurdering',
			description:
				'Sic transit gloria mundi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			href: ''
		}
	]
</script>

<div class="container my-12 max-w-[1024px] space-y-12">
	{#if $page.data.session}
		<div class="space-y-6">
			<h1 class="text-3xl font-bold md:text-4xl">Hei, {$selectedTestUser.name}</h1>
			<p>
				Du er {#if $selectedTestUser.role === 'teacher'}lærer{:else}elev{/if}. Her er dine
				undervisningsgrupper:
			</p>
			<div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<table class="min-w-full bg-white shadow-md">
					<thead>
						<tr>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
							>
								Undervisningsgruppe</th
							>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
							>
								Fag</th
							>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
							>
								Fagkode</th
							>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
							>
								Vurderingssituasjoner</th
							>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
							>
								Vurderinger</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each data.teachingGroupMemberships as teachingGroupMembership}
							<tr>
								<td class="whitespace-nowrap px-6 py-4"
									>{teachingGroupMembership.teachingGroup.displayName}</td
								>
								<td class="whitespace-nowrap px-6 py-4"
									>{teachingGroupMembership.teachingGroup.subjectDisplayName}</td
								>
								<td class="whitespace-nowrap px-6 py-4"
									>{teachingGroupMembership.teachingGroup.subjectCode}</td
								>
								<td class="whitespace-nowrap px-6 py-4"
									><a href="teachingGroup/{teachingGroupMembership.teachingGroup.id}">Link</a></td
								>
								<td class="whitespace-nowrap px-6 py-4"><a href="">Link</a></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="space-y-6">
			<h1 class="text-2xl font-semibold md:text-3xl">Dine vurderinger</h1>
			<div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each assessments as assessment}
					<Card.Root>
						<Card.Header>
							<Card.Title>
								{assessment.title}
							</Card.Title>
							<Card.Description>
								{assessment.description}
							</Card.Description>
						</Card.Header>
					</Card.Root>
				{/each}
			</div>
		</div>
	{:else}
		<div class="space-y-3">
			<h1 class="text-3xl font-bold md:text-4xl">Hmm..</h1>
			<p>Du logge inn for å kunne gjøre noe</p>
		</div>
	{/if}
</div>
