import { pingSupabase } from '$lib/server/db/supabase.js'
import { getTeachingGroupMemberships } from '$lib/server/db/user.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, parent, cookies }) => {
	const parentData = await parent()

	// verify that the supabase client is working
	await pingSupabase()

	const selectedTestUserId = cookies.get('selectedTestUserId')
	const { data, error } = await getTeachingGroupMemberships({ userId: selectedTestUserId })

	if (error) {
		console.error('Error fetching data:', error)
		throw new Error('Failed to load data')
	}
	return { teachingGroupMemberships: data }
}
