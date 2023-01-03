import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)
  // meals
  const { data } = await client.from('meals')
    .insert({
      name: params.name,
      note: params.note,
      type: params.type,
      tag: params.tags,
    })
    .select('*')
    .single()

  // tags
  params.tags.forEach(async (tag :any) => {
    await client.from('tags').upsert({ name: tag })
  });
  return data
})
