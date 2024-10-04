import { getTeachingGroup } from '$lib/server/db/teachingGroup.js'
import { getUsers } from '$lib/server/db/user.js'
import { createAssessment } from '$lib/server/db/assessment'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const { teachingGroup, assessmentFormats } = await getTeachingGroup({ teachingGroupId: params.id })
	const users = await getUsers()

	return {
		teachingGroup,
		assessmentFormats,
		users
	}
}

function getStorableAsessment(formData) {
	const assessment = JSON.parse(formData.get('assessment'))
	const result = {}
	result.teacher_id = assessment.teacherId
	result.student_id = assessment.studentId
	result.is_self_assessment = assessment.isSelfAssessment
	result.is_visible_to_student = assessment.isVisibleToStudent
	result.assessment_context_id = assessment.assessmentContext.id
	result.content = assessment.content
	result.assessment_format_id = '5208018f-a555-4920-82c0-2bbd2a3769db'
	return result
}


export const actions = {
	default: async ({ request }) => {
		console.log('POST')
		const formData = await request.formData()
		const assessment = getStorableAsessment(formData)
		const result = await createAssessment(assessment)
		console.log('result', result)
		return result
	}

}