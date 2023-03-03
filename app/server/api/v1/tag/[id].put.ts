import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')
  const { data } = await client.from('tags')
    .update({
      color: params.color,
    })
    .eq('id', id)
    .select('*')
    .single()
})
