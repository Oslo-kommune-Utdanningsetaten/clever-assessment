import { supabase } from '$lib/server/db/supabase.js'

export const getAssessmentFormats = async (options = {}) => {

  const selectFormats = `
    id,
    title,
    tags,
    format
  `
  const { data, error } = await supabase
    .from('AssessmentFormat')
    .select(selectFormats)

  return { data: data.map(acf => acf.assessmentFormat), error }
}