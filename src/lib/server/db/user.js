import { supabase } from '$lib/server/db/supabase.js'

export const getTeachingGroupMemberships = async (options = {}) => {
	const { userId } = options
	const selectStatement = `
    id,
		role,
    teachingGroup: TeachingGroup (
      id,
      subjectCode: subject_code,
      subjectDisplayName: subject_display_name,
      displayName: display_name
    )
  `
	const { data, error } = await supabase
		.from('TeachingGroupMembership')
		.select(selectStatement)
		.eq('user_id', userId)

	return { data, error }
}

export const getUsers = async () => {
	const { data, error } = await supabase.from('User').select('*')

	return data
}
