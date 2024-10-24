import { supabase } from '$lib/server/db/supabase.js'

const selectTeachingGroup = `
    id,
    displayName: display_name,
    assessmentContexts: AssessmentContext(
      id,
      title,
      description,
      createdAt: created_at,
      assessments: Assessment(
        id,
        content,
        createdAt: created_at,
        isSelfAssessment: is_self_assessment,
        isVisibleToStudent: is_visible_to_student,
        student:student_id(
          id,
          name
        ),
        teacher:teacher_id(
          id,
          name
        ),
        assessmentFormat:assessment_format_id(
          id,
          title,
          tags,
          variant
        )
      )
    ),
    members: TeachingGroupMembership(
      id,
      role,
      user: User(
        id,
        name
      )
    )
  `

export const getTeachingGroup = async (options = {}) => {
  const { teachingGroupId } = options

  const { data, error } = await supabase
    .from('TeachingGroup')
    .select(selectTeachingGroup)
    .eq('id', teachingGroupId)

  const teachingGroup = data[0]

  // hide foreign key table and filter out non-students from the members list
  const students = teachingGroup.members.filter((member) => member.role === 'student').map((student) => student.user)
  teachingGroup.students = students

  // assuming there is only one teacher per group
  teachingGroup.teacher = teachingGroup.members.find((member) => member.role === 'teacher').user

  // we now have students and teacher, delete members
  delete teachingGroup.members

  // sort stuff
  teachingGroup.students.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })
  teachingGroup.assessmentContexts.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })

  return { teachingGroup }
}
