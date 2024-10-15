import { supabase } from '$lib/server/db/supabase.js'

export const getAssessmentContexts = async (options = {}) => {
  // todo  
}

export const createAssessmentContext = async (assessmentContext) => {
  const { data, error } = await supabase
    .from('AssessmentContext')
    .insert(assessmentContext)
    .select()
  return { data, error }
}

export const updateAssessmentContext = async (assessmentContext) => {
  const { data, error } = await supabase
    .from('AssessmentContext')
    .update(assessmentContext)
    .eq('id', assessmentContext.id)
    .select()
  return { data, error }
}

export const deleteAssessmentContext = async (assessmentContextId) => {
  const { data, error } = await supabase
    .from('AssessmentContext')
    .delete()
    .eq('id', assessmentContextId)
    .select()
  return { data, error }
}