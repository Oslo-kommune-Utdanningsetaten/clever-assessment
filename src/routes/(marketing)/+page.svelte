<script>
	import * as Card from '$ui/card'
	import { Button } from '$ui/button'
	import { Separator } from '$ui/separator'
	import { page } from '$app/stores'
	import { selectedTestUser } from '$lib/stores/userStore.js'

	export let data
</script>

<div class="container my-12 max-w-[1024px] space-y-12">
	{#if $page.data.session}
		<div class="space-y-6">
			<h1 class="text-3xl font-bold md:text-4xl">Hei, {$selectedTestUser.name}</h1>
			<p>
				Du er {#if $selectedTestUser.role === 'teacher'}lærer{:else}elev{/if}
			</p>
			<div class="overflow-x-auto">
				<table class="w-full shadow-md">
					<thead>
						<tr>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6"
							>
								Undervisningsgruppe
							</th>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6"
							>
								Fag
							</th>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6"
							>
								Fagkode
							</th>
							<th
								class="bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6"
							>
								Vurderinger
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each data.teachingGroupMemberships as teachingGroupMembership}
							<tr>
								<td class="whitespace-nowrap px-6 py-4">
									{teachingGroupMembership.teachingGroup.displayName}
								</td>
								<td class="whitespace-nowrap px-6 py-4">
									{teachingGroupMembership.teachingGroup.subjectDisplayName}
								</td>
								<td class="whitespace-nowrap px-6 py-4">
									{teachingGroupMembership.teachingGroup.subjectCode}
								</td>
								<td class="whitespace-nowrap px-6 py-4">
									<a
										class="hover:underline hover:underline-offset-2"
										href="teachingGroup/{teachingGroupMembership.teachingGroup.id}"
									>
										Link
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else}
		<div class="space-y-3">
			<h1 class="text-3xl font-bold md:text-4xl">Hmm..</h1>
			<p>Du logge inn for å kunne gjøre noe</p>
		</div>
	{/if}
</div>
