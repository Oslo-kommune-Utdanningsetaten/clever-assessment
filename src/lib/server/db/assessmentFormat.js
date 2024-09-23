import { supabase } from '$lib/server/db/supabase.js'

export const getAssessmentFormats = async (options = {}) => {
  const { assessmentContextId } = options

  const selectContextFormats = `
    id,
    formatId: format_id,
    contextId: context_id,
    assessmentFormat: AssessmentFormat(
      id,
      title,
      isVisisbleToStudent: is_visible_to_student,
      tags,
      format
    )
  `
  const { data, error } = await supabase
    .from('AssessmentContextFormat')
    .select(selectContextFormats)
    .eq('context_id', assessmentContextId)

  return { data: data.map(acf => acf.assessmentFormat), error }
}