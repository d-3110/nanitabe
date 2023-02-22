import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')
  // meals
  const { data } = await client.from('meals')
    .update({
      name: params.name,
      note: params.note,
      type: params.type,
      tag: params.tags,
    })
    .eq('id', id)
    .select('*')
    .single()

  // tags
  params.tags.forEach(async (tag :any) => {
    await client.from('tags').upsert({ name: tag })
  });
  return data
})
