<script>
	import TableCell from '$lib/components/ui/assessment/table-cell.svelte'
	import AssessmentEditForm from '$lib/components/ui/assessment/assessment-edit-form.svelte'
	import { selectedTestUser } from '$lib/stores/userStore.js'

	export let data
	let teacher = $selectedTestUser
	let isFormVisible = false
	let selectedAssessmentContext
	let selectedStudent

	let { teachingGroup, assessmentFormats } = data

	$: {
		;({ teachingGroup } = data)
		teacher = $selectedTestUser
	}

	const getAssessments = (studentId, assessments) => {
		return assessments ? assessments.filter(assessment => assessment.student.id === studentId) : []
	}

	const countAssessments = studentId => {
		let count = 0
		teachingGroup.assessmentContexts.forEach(assessmentContext => {
			const assessments = getAssessments(studentId, assessmentContext.assessments)
			count += assessments.length
		})
		return count
	}

	const toggleForm = async (options = {}) => {
		const { student, assessmentContext } = options
		selectedAssessmentContext = assessmentContext
		selectedStudent = student
		isFormVisible = !isFormVisible
	}
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
						class="text-wrap border-r-2 bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Tittel
					</th>
					<th
						class=" ext-wrap border-r-2 bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Beskrivelse
					</th>
					<th
						class="text-wrap bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
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
		<h2 class="font-bold sm:text-2xl md:text-3xl">Elevene</h2>
		<table class="min-w-full table-auto shadow-md">
			<thead>
				<tr>
					<th
						class="text-wrap border-r-2 bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Navn
					</th>
					<th
						class="text-wrap border-r-2 bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Vurderinger
					</th>
					{#each teachingGroup.assessmentContexts as assessmentContext}
						<th
							class="text-wrap border-r-2 bg-gray-100 px-6 py-3 text-left align-top text-xs font-semibold uppercase tracking-wider text-gray-700 last:border-r-0"
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
							<td class="whitespace-nowrap text-wrap p-4 align-top">
								{countAssessments(student.id)}
							</td>
							{#each teachingGroup.assessmentContexts as assessmentContext}
								<TableCell
									editFunction={() => toggleForm({ student, assessmentContext })}
									assessments={getAssessments(student.id, assessmentContext.assessments)}
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
		class={`duration-400 absolute bottom-[-50px] right-0 overflow-hidden rounded border-2 border-emerald-300 shadow-lg transition-all ease-in-out ${
			isFormVisible ? 'w-1/2' : 'w-0'
		}`}
	>
		{#if isFormVisible}
			<AssessmentEditForm
				assessmentContext={selectedAssessmentContext}
				student={selectedStudent}
				{teacher}
				doneFunction={() => toggleForm()}
				assessment={null}
				{assessmentFormats}
			/>
		{/if}
	</div>
</div>
