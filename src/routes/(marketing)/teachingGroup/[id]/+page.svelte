<script>
	import Toggle from 'svelte-toggle'
	import { enhance } from '$app/forms'
	import { fly } from 'svelte/transition'
	import TableCell from '$lib/components/ui/assessment/table-cell.svelte'
	import AssessmentEditForm from '$lib/components/ui/assessment/assessment-edit-form.svelte'
	import AssessmentContextEditForm from '$lib/components/ui/assessment/assessment-context-edit-form.svelte'
	import PencilIcon from 'lucide-svelte/icons/file-pen-line'
	import TrashIcon from 'lucide-svelte/icons/trash-2'
	import { selectedTestUser } from '$lib/stores/userStore.js'
	import { onMount } from 'svelte'

	export let data
	let assessmentFormContainer
	let assessmentContextFormContainer
	let teacher = $selectedTestUser
	let isAssessmentFormVisible = false
	let isAssessmentContextFormVisible = false
	let selectedStudent
	let selectedAssessment
	let selectedAssessmentContext
	let isMaintenanceModeEnabled = false

	let { teachingGroup, assessmentFormats } = data

	$: {
		;({ teachingGroup } = data)
		teacher = $selectedTestUser
	}

	const getAssessments = (studentId, assessments) => {
		return assessments ? assessments.filter(assessment => assessment.student.id === studentId) : []
	}

	const createAssessment = async (options = {}) => {
		const { student, assessmentContext } = options
		selectedAssessmentContext = assessmentContext
		selectedStudent = student
		selectedAssessment = null
		toggleAssessmentForm()
	}

	const editAssessment = async (options = {}) => {
		const { student, assessmentContext, assessment } = options
		selectedAssessmentContext = assessmentContext
		selectedStudent = student
		selectedAssessment = assessment
		toggleAssessmentForm()
	}

	const createAssessmentContext = async (options = {}) => {
		selectedAssessmentContext = null
		toggleAssessmentContextForm()
	}

	const editAssessmentContext = async (options = {}) => {
		const { assessmentContext } = options
		selectedAssessmentContext = assessmentContext
		toggleAssessmentContextForm()
	}

	const toggleAssessmentContextForm = () => {
		const scrollY = window.scrollY
		assessmentContextFormContainer.style.top = `${scrollY}px`
		isAssessmentContextFormVisible = !isAssessmentContextFormVisible
	}

	const toggleAssessmentForm = () => {
		const scrollY = window.scrollY
		assessmentFormContainer.style.top = `${scrollY}px`
		isAssessmentFormVisible = !isAssessmentFormVisible
	}

	const toggleMaintenanceMode = () => {
		isMaintenanceModeEnabled = !isMaintenanceModeEnabled
	}

	onMount(() => {
		isMaintenanceModeEnabled = false
	})
</script>

<div class="container relative my-12 max-w-[1024px] space-y-10">
	<h2 class="font-bold sm:text-2xl md:text-3xl">
		Undervisningsgruppe: {teachingGroup.displayName}
	</h2>
	<div class="mb-4">
		<label for="studentVisibility" class="text-l mb-2">Farligmodus</label>
		<Toggle
			on:toggle={toggleMaintenanceMode}
			toggled={isMaintenanceModeEnabled}
			label=""
			switchColor="#eee"
			toggledColor="red"
			untoggledColor="green"
			on="Aktivert 😱"
			off="Deaktivert 😎"
		/>
	</div>
	<div class="space-y-6">
		<h2 class="text-3xl font-bold md:text-3xl">Vurderingssituasjoner</h2>

		<table class="min-w-full table-auto border-separate rounded border border-gray-300 shadow-md">
			<thead>
				<tr>
					<th
						class="text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Tittel
					</th>
					<th
						class="text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Beskrivelse
					</th>
					<th
						class="text-wrap bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Vurderinger
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#if teachingGroup?.assessmentContexts?.length}
					{#each teachingGroup.assessmentContexts as assessmentContext}
						<tr>
							<td
								class="flex items-center whitespace-nowrap text-wrap border-b-2 border-gray-100 px-4 py-3 align-top"
							>
								<span class="mr-2">
									{assessmentContext.title}
								</span>
								<span title="Rediger denne vurderingssituasjonen">
									<button
										type="submit"
										class="balck rounded p-2 hover:bg-green-600 hover:text-white"
										on:click={editAssessmentContext({ assessmentContext })}
									>
										<PencilIcon class="h-4 w-4" />
									</button>
								</span>
								{#if isMaintenanceModeEnabled && !assessmentContext.assessments.length}
									<span
										title="Slett denne vurderingen"
										in:fly={{ x: 20, duration: 300 }}
										out:fly={{ x: 20, duration: 300 }}
									>
										<form method="POST" action="?/deleteAssessmentContext" use:enhance>
											<input type="hidden" name="action" value="deleteAssessmentContext" />
											<input
												type="hidden"
												name="assessmentContextId"
												value={assessmentContext.id}
											/>
											<button
												type="submit"
												class="rounded bg-red-500 p-2 text-white hover:bg-red-700"
											>
												<TrashIcon class="h-4 w-4" />
											</button>
										</form>
									</span>
								{/if}
							</td>
							<td
								class="whitespace-nowrap text-wrap border-b-2 border-gray-100 px-4 py-3 align-top"
							>
								{assessmentContext.description || ''}
							</td>
							<td
								class="whitespace-nowrap text-wrap border-b-2 border-gray-100 px-4 py-3 align-top"
							>
								{assessmentContext.assessments?.length}
							</td>
						</tr>
					{/each}
				{/if}
				<tr>
					<td colspan="3" class="whitespace-nowrap text-wrap px-4 py-3 align-top">
						<button
							on:click={() => createAssessmentContext({ teachingGroup })}
							title="Opprett en ny vurderingssituasjon"
							class="transform rounded border border-gray-600 px-2 pb-2 pt-1 text-sm text-gray-600 transition hover:border-green-600 hover:bg-green-600 hover:text-white"
						>
							Ny vurderingssituasjon
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="space-y-6">
		<h2 class="font-bold sm:text-2xl md:text-3xl">Elever</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full table-auto border-separate rounded border border-gray-300 shadow-md">
				<thead>
					<tr>
						<th
							class="sticky left-0 w-1/6 text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
						>
							Navn
						</th>
						{#each teachingGroup.assessmentContexts as assessmentContext}
							<th
								class="w-1/3 text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700 last:border-r-0"
							>
								{assessmentContext.title}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#if teachingGroup?.students?.length}
						{#each teachingGroup.students as student}
							<tr>
								<td
									class="sticky left-0 z-50 whitespace-nowrap text-wrap border-b-2 border-r-2 bg-gray-100 p-4 align-top"
								>
									{student.name}
								</td>
								{#each teachingGroup.assessmentContexts as assessmentContext}
									<TableCell
										editFunction={editAssessment}
										createFunction={createAssessment}
										assessments={getAssessments(student.id, assessmentContext.assessments)}
										{student}
										{assessmentContext}
										isDeleteEnabled={isMaintenanceModeEnabled}
									/>
								{/each}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>

	<!-- AssessmentContext Form (Initially Hidden) -->
	<div
		bind:this={assessmentContextFormContainer}
		class={`duration-400 absolute right-0 overflow-hidden rounded border-2 border-emerald-400 shadow-lg transition-all ease-in-out ${
			isAssessmentContextFormVisible ? 'w-1/2 border-emerald-400' : 'w-0 border-none'
		}`}
	>
		{#if isAssessmentContextFormVisible}
			<AssessmentContextEditForm
				assessmentContext={selectedAssessmentContext}
				{teachingGroup}
				doneFunction={() => toggleAssessmentContextForm()}
			/>
		{/if}
	</div>

	<!-- Assessment Form (Initially Hidden) -->
	<div
		bind:this={assessmentFormContainer}
		class={`duration-400 absolute right-0 overflow-hidden rounded border-2 border-emerald-400 shadow-lg transition-all ease-in-out ${
			isAssessmentFormVisible ? 'w-1/2 border-emerald-400' : 'w-0 border-none'
		}`}
	>
		{#if isAssessmentFormVisible}
			<AssessmentEditForm
				assessmentContext={selectedAssessmentContext}
				student={selectedStudent}
				{teacher}
				doneFunction={() => toggleAssessmentForm()}
				assessment={selectedAssessment}
				{assessmentFormats}
			/>
		{/if}
	</div>
</div>
