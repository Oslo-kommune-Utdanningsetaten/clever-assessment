import { supabase } from '$lib/server/db/supabase.js'

export const getTeachingGroup = async (options = {}) => {
  const { teachingGroupId } = options
  const selectTeachingGroup = `
    id,
    displayName: display_name,
    assessmentContexts: AssessmentContext(
      id,
      title,
      description,
      assessments: Assessment(
        id,
        content,
        created_at,
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

  // we now have students and teacher, delete members
  delete teachingGroup.members

  return { teachingGroup }
}
