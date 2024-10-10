import { getAssessments } from '$lib/server/db/assessment'

/** @type {import('../$types').PageServerLoad} */
export const load = async ({ params }) => {
	const ids = params.id.split(',')
	const { data, error } = await getAssessments({ ids })

	return {
		assessments: data
	}

}