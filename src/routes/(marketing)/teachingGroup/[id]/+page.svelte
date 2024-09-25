<script>
	import TableCell from '$lib/components/ui/assessment/table-cell.svelte'
	import AssessmentEditForm from '$lib/components/ui/assessment/assessment-edit-form.svelte'

	export let data
	let assessmentFormElement
	let isFormVisible = false
	let selectedAssessmentContext
	let selectedStudent

	let { teachingGroup } = data

	$: {
		;({ teachingGroup } = data)
	}

	const getAssessment = (studentId, assessments) => {
		return assessments.find(assessment => assessment.studentId === studentId)
	}

	const toggleForm = async (options = {}) => {
		const { student, assessment, assessmentContext } = options
		console.log('toggleForm for', student, 'in', assessmentContext)
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
						class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Tittel
					</th>
					<th
						class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Beskrivelse
					</th>
					<th
						class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Format
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#if teachingGroup?.assessmentContexts?.length}
					{#each teachingGroup.assessmentContexts as assessmentContext}
						<tr>
							<td class="whitespace-nowrap text-wrap px-6 py-4">{assessmentContext.title}</td>
							<td class="whitespace-nowrap text-wrap px-6 py-4">
								{assessmentContext.description || ''}
							</td>
							<td class="whitespace-nowrap text-wrap px-6 py-4">
								{assessmentContext.assessmentFormats.map(af => af.title).join(', ')}
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
						class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Navn
					</th>
					<th
						class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
					>
						Vurderinger
					</th>
					{#each teachingGroup.assessmentContexts as assessmentContext}
						<th
							class="text-wrap bg-gray-100 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
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
							<td class="whitespace-nowrap text-wrap px-6 py-4">{student.name}</td>
							<td class="whitespace-nowrap text-wrap px-6 py-4">2</td>
							{#each teachingGroup.assessmentContexts as assessmentContext}
								<TableCell
									editFunction={() => toggleForm({ student, assessmentContext })}
									assessment={getAssessment(student.id, assessmentContext.assessments)}
									{student}
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
		class={`duration-400 absolute bottom-0 right-0 overflow-hidden shadow-md transition-all ease-in-out ${
			isFormVisible ? 'w-1/2' : 'w-0'
		}`}
		bind:this={assessmentFormElement}
	>
		<AssessmentEditForm
			assessmentContext={selectedAssessmentContext}
			student={selectedStudent}
			saveFunction={() => console.log('save')}
			cancelFunction={() => toggleForm()}
		/>
	</div>
</div>
