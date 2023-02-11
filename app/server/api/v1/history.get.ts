import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data } = await client.from('histories')
    .select(`*,meals(name)`)
    .order('id', { ascending: false })
    .limit(20)
  return data
})
