import { supabase } from '$lib/server/db/supabase.js'

export const getAssessments = async (options = {}) => {
  const { ids, studentId, teacherId, assessmentContextId } = options
  const selectStatement = `
    id,
    content,
    isSelfAssessment: is_self_assessment,
    isVisibleToStudent: is_visible_to_student,
    createdAt: created_at,
    assessmentContext:assessment_context_id(
      id,
      title,
      description,
      teachingGroup:teaching_group_id(
        id,
        subjectCode:subject_code,
        subjectDisplayName:subject_display_name,
        displayName:display_name
      )
    ),
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
  `
  let query = supabase
    .from('Assessment')
    .select(selectStatement)

  if (ids) {
    query = query.in('id', ids)
  }
  if (studentId) {
    query = query.eq('student_id', studentId)
  }
  if (teacherId) {
    query = query.eq('teacher_id', teacherId)
  }
  if (assessmentContextId) {
    query = query.eq('assessment_context_id', assessmentContextId)
  }

  const { data, error } = await query
  return { data, error }
}

export const createAssessment = async (assessment) => {
  const { data, error } = await supabase
    .from('Assessment')
    .insert(assessment)
    .select()
  return { data, error }
}

export const updateAssessment = async (assessment) => {
  console.log('updateAssessment', assessment)
  const { data, error } = await supabase
    .from('Assessment')
    .update(assessment)
    .eq('id', assessment.id)
    .select()
  console.log('THE updated assessment', data, error)
  return { data, error }
}

export const deleteAssessment = async (assessmentId) => {
  const { data, error } = await supabase
    .from('Assessment')
    .delete()
    .eq('id', assessmentId)
    .select()
  return { data, error }
}