import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = PUBLIC_SUPABASE_URL
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const pingSupabase = async () => {
  const { data, error } = await supabase.from('Assessment').select('*', { count: 'exact' })
  if (error) {
    console.error('Mjauski :/ Failed to connect to database', error)
    throw error
  } else {
    console.log('Supabase is up and running')
  }
}
