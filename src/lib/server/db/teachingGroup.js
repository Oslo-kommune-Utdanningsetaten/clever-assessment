import { supabase } from '$lib/server/db/supabase.js'
import { getAssessmentFormats } from './assessmentFormat.js'

export const getTeachingGroup = async (options = {}) => {
  const { teachingGroupId } = options
  const selectTeachingGroup = `
    id,
    displayName: display_name,
    assessmentContexts: AssessmentContext(
      id,
      title,
      description
    ),
    students: TeachingGroupMembership(
      id,
      user: User(
        id,
        name,
        role
      )
    )
  `
  const { data, error } = await supabase
    .from('TeachingGroup')
    .select(selectTeachingGroup)
    .eq('id', teachingGroupId)

  const teachingGroup = data[0]

  // build a properly formatted obeject worty as a return value
  const result = Object.assign({}, teachingGroup, { assessmentContexts: [] })

  // hide foreign key table and filter out non-students from the members list
  const students = teachingGroup.students.map((member) => member.user).filter((student) => student.role === 'student')
  result.students = students

  // array of promises to get assessment formats for each context
  const promises = teachingGroup.assessmentContexts.map(async (assessmentContext) => {
    result.assessmentContexts.push(assessmentContext)
    return getAssessmentFormats({ assessmentContextId: assessmentContext.id })
  })

  // apply results of promises to the result object
  await Promise.all(promises).then((assessmentFormats) => {
    assessmentFormats.forEach((assessmentFormat, index) => {
      result.assessmentContexts[index].assessmentFormats = assessmentFormat.data
    })
  })

  return { data: result, error }
}
