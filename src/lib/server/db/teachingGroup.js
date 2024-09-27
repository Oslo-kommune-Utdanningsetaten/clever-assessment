import { supabase } from '$lib/server/db/supabase.js'
import { getAssessmentFormats } from './assessmentFormat.js'
import { getAssessments } from './assessment.js'

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
    members: TeachingGroupMembership(
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

  // hide foreign key table and filter out non-students from the members list
  const students = teachingGroup.members.map((member) => member.user).filter((member) => member.role === 'student')
  teachingGroup.students = students

  // assuming there is only one teacher per group
  teachingGroup.teacher = teachingGroup.members.map((member) => member.user).find((member) => member.role === 'teacher')

  // we now have students and teacher
  delete teachingGroup.members

  // just get all assessment formats for now
  const assessmentFormats = await getAssessmentFormats()

  // array of promises to get assessments for each context
  const assessmentsPromise = teachingGroup.assessmentContexts.map(async (assessmentContext) => {
    return getAssessments({ assessmentContextId: assessmentContext.id })
  })

  // resolve promise and apply assessments to the result object
  await Promise.all(assessmentsPromise).then(assessmentsPerContext => {
    assessmentsPerContext.forEach((assessments, index) => {
      teachingGroup.assessmentContexts[index].assessments = assessments.data
    })
  })

  return { teachingGroup, assessmentFormats }
}
