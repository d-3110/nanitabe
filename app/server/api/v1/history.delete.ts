import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)

  const { data } = await client.from('histories')
    .delete()
    .in('id', params.ids)
})
