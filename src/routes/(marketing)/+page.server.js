import { pingSupabase } from '$lib/server/db/supabase.js'
import { getTeachingGroupMemberships, getUsers } from '$lib/server/db/user.js'
import { getAssessments } from '$lib/server/db/assessment.js'

function assessmentsByAssessmentContext(assessments) {
	const assessmentContexts = []
	assessments.forEach((assessment) => {
		const contextId = assessment.assessmentContext.id
		let assessmentContext = assessmentContexts.find((context) => context.id === contextId)
		if (!assessmentContext) {
			assessmentContext = assessment.assessmentContext
			assessmentContexts.push(Object.assign({}, assessmentContext))
		}
		const someAssessments = assessmentContext.assessments || []
		someAssessments.push(assessment)
		assessmentContext.assessments = someAssessments
	})
	return assessmentContexts
}

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, parent, cookies }) => {
	const parentData = await parent()

	// verify that the supabase client is working
	await pingSupabase()

	const selectedTestUserId = cookies.get('selectedTestUserId')
	const { data, error } = await getTeachingGroupMemberships({ userId: selectedTestUserId })
	const { data: assessments, error: assessmentError } = await getAssessments({ studentId: selectedTestUserId })
	const abac = assessmentsByAssessmentContext(assessments)
	console.log('abac', abac)
	if (error) {
		console.error('Error fetching teaching group memberships:', error)
		throw new Error('Error fetching teaching group memberships')
	}
	if (assessmentError) {
		console.error('Error fetching assessments:', assessmentError)
		throw new Error('Error fetching assessments')
	}

	const users = await getUsers()

	return {
		teachingGroupMemberships: data,
		assessments,
		users,
		assessmentsByAssessmentContext: abac
	}
}
