import { redirect } from '@sveltejs/kit'
import { createAssessment } from '$lib/server/db/assessment'

export const POST = async ({ url, data }) => {
  console.log('POST')
  console.log('url', url)
  console.log('data', data)
  const assessment = data.assessment
  const redirectUrl = url.searchParams.get('r') || '/'
  const result = await createAssessment(assessment)
  return result
  //throw redirect(303, `${redirectUrl}`)
}