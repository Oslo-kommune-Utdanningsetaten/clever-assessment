import { getTeachingGroup } from '$lib/server/db/teachingGroup.js'
import { getUsers } from '$lib/server/db/user.js'
import { createAssessment, deleteAssessment } from '$lib/server/db/assessment'
import { getAssessmentFormats } from '$lib/server/db/assessmentFormat'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const { teachingGroup } = await getTeachingGroup({ teachingGroupId: params.id })
	const { assessmentFormats } = await getAssessmentFormats()
	const users = await getUsers()

	return {
		teachingGroup,
		assessmentFormats,
		users
	}
}

function assembleStorableAsessment(assessment) {
	const result = {}
	result.teacher_id = assessment.teacherId
	result.student_id = assessment.studentId
	result.is_self_assessment = assessment.isSelfAssessment
	result.is_visible_to_student = assessment.isVisibleToStudent
	result.assessment_context_id = assessment.assessmentContext.id
	result.content = assessment.content
	result.assessment_format_id = assessment.assessmentFormat.id
	return result
}


export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		const storableAssessment = assembleStorableAsessment(JSON.parse(formData.get('assessment')))
		const { data, error } = await createAssessment(storableAssessment)
		return data
	},
	delete: async ({ request }) => {
		const formData = await request.formData()
		const assessmentId = formData.get('assessmentId')
		const { data, error } = await deleteAssessment(assessmentId)
		return data
	}
}