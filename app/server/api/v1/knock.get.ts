import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data } = await client.from('knocks').select('name')
  return data[0].name
})
