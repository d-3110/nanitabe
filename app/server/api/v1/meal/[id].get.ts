import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')
  const { data } = await client.from('meals').select('*').eq('id', id).single()
  return data
})