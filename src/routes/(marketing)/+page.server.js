import { getTeachingGroupMemberships } from '$lib/server/db/user.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, parent, cookies }) => {
	const parentData = await parent()

	const selectedTestUserId = cookies.get('selectedTestUserId')
	const { data, error } = await getTeachingGroupMemberships({ userId: selectedTestUserId })

	if (error) {
		console.error('Error fetching data:', error)
		throw new Error('Failed to load data')
	}
	return { teachingGroupMemberships: data }
}
