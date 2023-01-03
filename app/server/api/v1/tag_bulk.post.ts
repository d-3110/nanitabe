import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const result :Array<number> = []
  const params = await readBody(event)
  const client = serverSupabaseClient(event)
  params.tags.forEach((tag :any) => {
    result.push(client.from('tags').upsert({ name: tag }).select('id'))
  });
})
