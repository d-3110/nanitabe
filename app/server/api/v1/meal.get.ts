import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const params = getQuery(event)
  let query = client.from('meals').select('*')
  
  if ('types' in params) {
    query.in('type', Array.isArray(params.types) ? params.types : [params.types])
  }

  if ('tags' in params) {
    if ('isTagAnd' in params) {
      params.isTagAnd == 'true'
        ? query.contains('tag', Array.isArray(params.tags) ? params.tags : [params.tags])
        : query.overlaps('tag', Array.isArray(params.tags) ? params.tags : [params.tags])
    }
  }

  if ('name' in params) {
    query.like('name', '%' + params.name + '%')
  }
  const { data } = await query
  return data
})
