import { getTeachingGroup } from '$lib/server/db/teachingGroup.js'
import { getUsers } from '$lib/server/db/user.js'
import { createAssessment, deleteAssessment, updateAssessment } from '$lib/server/db/assessment'
import { createAssessmentContext, deleteAssessmentContext, updateAssessmentContext } from '$lib/server/db/assessmentContext'
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
	result.id = assessment.id
	result.teacher_id = assessment.teacher.id
	result.student_id = assessment.student.id
	result.is_self_assessment = assessment.isSelfAssessment
	result.is_visible_to_student = assessment.isVisibleToStudent
	result.assessment_context_id = assessment.assessmentContext.id
	result.content = assessment.content
	result.assessment_format_id = assessment.assessmentFormat.id
	return result
}

function assembleStorableAsessmentContext(assessmentContext) {
	const result = {}
	result.id = assessmentContext.id
	result.title = assessmentContext.title
	result.description = assessmentContext.description
	result.teaching_group_id = assessmentContext.teachingGroup.id
	return result
}


export const actions = {
	createAssessment: async ({ request }) => {
		const formData = await request.formData()
		const storableAssessment = assembleStorableAsessment(JSON.parse(formData.get('assessment')))
		const { data, error } = await createAssessment(storableAssessment)
		return data
	},
	deleteAssessment: async ({ request }) => {
		const formData = await request.formData()
		const assessmentId = formData.get('assessmentId')
		const { data, error } = await deleteAssessment(assessmentId)
		return data
	},
	updateAssessment: async ({ request }) => {
		const formData = await request.formData()
		const storableAssessment = assembleStorableAsessment(JSON.parse(formData.get('assessment')))
		const { data, error } = await updateAssessment(storableAssessment)
		return data
	},
	createAssessmentContext: async ({ request }) => {
		const formData = await request.formData()
		const storableAssessmentContext = assembleStorableAsessmentContext(JSON.parse(formData.get('assessmentContext')))
		const { data, error } = await createAssessmentContext(storableAssessmentContext)
		return data
	},
	deleteAssessmentContext: async ({ request }) => {
		const formData = await request.formData()
		const assessmentContextId = formData.get('assessmentContextId')
		const { data, error } = await deleteAssessmentContext(assessmentContextId)
		return data
	},
	updateAssessmentContext: async ({ request }) => {
		const formData = await request.formData()
		const storableAssessmentContext = assembleStorableAsessmentContext(JSON.parse(formData.get('assessmentContext')))
		const { data, error } = await updateAssessmentContext(storableAssessmentContext)
		return data
	}
}