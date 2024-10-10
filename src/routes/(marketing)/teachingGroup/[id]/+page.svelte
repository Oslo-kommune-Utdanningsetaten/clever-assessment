<script>
	import Toggle from 'svelte-toggle'
	import TableCell from '$lib/components/ui/assessment/table-cell.svelte'
	import AssessmentEditForm from '$lib/components/ui/assessment/assessment-edit-form.svelte'
	import { selectedTestUser } from '$lib/stores/userStore.js'
	import { onMount } from 'svelte'

	export let data
	let formContainer
	let teacher = $selectedTestUser
	let isFormVisible = false
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
		toggleForm()
	}

	const editAssessment = async (options = {}) => {
		const { student, assessmentContext, assessment } = options
		selectedAssessmentContext = assessmentContext
		selectedStudent = student
		selectedAssessment = assessment
		toggleForm()
	}

	const toggleForm = () => {
		const scrollY = window.scrollY
		formContainer.style.top = `${scrollY}px`
		isFormVisible = !isFormVisible
	}

	const toggleMaintenanceMode = () => {
		isMaintenanceModeEnabled = !isMaintenanceModeEnabled
	}

	onMount(() => {
		isMaintenanceModeEnabled = false
	})
</script>

<div class="container relative my-12 max-w-[1024px] space-y-12">
	<h2 class="font-bold sm:text-2xl md:text-3xl">
		Undervisningsgruppe: {teachingGroup.displayName}
	</h2>

	<div class="space-y-6">
		<h2 class="text-3xl font-bold md:text-3xl">Vurderingssituasjoner</h2>

		<table class="min-w-full shadow-md">
			<thead>
				<tr>
					<th
						class="text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Tittel
					</th>
					<th
						class=" ext-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
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
							<td class="whitespace-nowrap text-wrap p-4 align-top">
								{assessmentContext.title}
							</td>
							<td class="whitespace-nowrap text-wrap p-4 align-top">
								{assessmentContext.description || ''}
							</td>
							<td class="whitespace-nowrap text-wrap p-4 align-top">
								{assessmentContext.assessments?.length}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<div class="space-y-6">
		<h2 class="font-bold sm:text-2xl md:text-3xl">Elever</h2>
		<div class="mb-4">
			<label for="studentVisibility" class="text-l mb-2">Vedlikeholdsmodus</label>
			<Toggle
				on:toggle={toggleMaintenanceMode}
				toggled={isMaintenanceModeEnabled}
				label=""
				switchColor="#eee"
				toggledColor="red"
				untoggledColor="green"
				on="Aktivert"
				off="Deaktivert"
			/>
		</div>
		<table class="min-w-full table-auto shadow-md">
			<thead>
				<tr>
					<th
						class="w-1/6 text-wrap border-r-2 bg-gray-100 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
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
							<td class="whitespace-nowrap text-wrap p-4 align-top">{student.name}</td>
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

	<!-- Sidebar Form (Initially Hidden) -->
	<div
		bind:this={formContainer}
		class={`duration-400 absolute right-0 overflow-hidden rounded border-2 border-emerald-400 shadow-lg transition-all ease-in-out ${
			isFormVisible ? 'w-1/2' : 'w-0'
		}`}
	>
		{#if isFormVisible}
			<AssessmentEditForm
				assessmentContext={selectedAssessmentContext}
				student={selectedStudent}
				{teacher}
				doneFunction={() => toggleForm()}
				assessment={selectedAssessment}
				{assessmentFormats}
			/>
		{/if}
	</div>
</div>
