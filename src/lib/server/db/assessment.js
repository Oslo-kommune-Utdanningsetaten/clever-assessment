import { supabase } from '$lib/server/db/supabase.js'

export const getAssessments = async (options = {}) => {
  const { studentId, teacherId, assessmentContextId } = options
  const selectStatement = `
    id,
    content,
    is_self_assessment,
    created_at,
    assessmentContext:assessment_context_id(
      id,
      title,
      description
    ),
    student:student_id(
      id,
      name
    ),
    teacher:teacher_id(
      id,
      name
    )
  `
  let query = supabase
    .from('Assessment')
    .select(selectStatement)

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

export const deleteAssessment = async (assessmentId) => {
  const { data, error } = await supabase
    .from('Assessment')
    .delete()
    .eq('id', assessmentId)
    .select()
  return { data, error }
}