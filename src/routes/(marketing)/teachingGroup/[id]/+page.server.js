import { getTeachingGroup } from '$lib/server/db/teachingGroup.js'
import { getUsers } from '$lib/server/db/user.js'

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
