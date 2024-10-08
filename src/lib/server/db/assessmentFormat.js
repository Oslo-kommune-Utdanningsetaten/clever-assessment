import { supabase } from '$lib/server/db/supabase.js'

export const getAssessmentFormats = async (options = {}) => {

  const selectFormats = `
    id,
    title,
    tags,
    variant
  `
  const { data, error } = await supabase
    .from('AssessmentFormat')
    .select(selectFormats)

  if (error) {
    console.error('Failed to fetch assessment formats', error)
    throw error
  }

  return {
    assessmentFormats: data
  }
}