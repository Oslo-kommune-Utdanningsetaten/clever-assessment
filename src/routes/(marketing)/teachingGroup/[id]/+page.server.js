import { getTeachingGroup } from '$lib/server/db/teachingGroup.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const { data, error } = await getTeachingGroup({ teachingGroupId: params.id })

	if (error) {
		console.error('Error fetching data:', error)
		throw new Error('Failed to load data')
	}
	return { teachingGroup: data }
}
