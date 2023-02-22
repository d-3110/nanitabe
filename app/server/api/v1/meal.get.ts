import { serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE, getStartIndex } from '~~/utils/common'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const params = getQuery(event)
  const startIndex = getStartIndex('page' in params ? Number(params.page) : 1)
  let query = client.from('meals')
                    .select('*', { count: 'exact' })
                    .range(startIndex, startIndex + (PAGE_SIZE - 1))

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
  const { data, count } = await query.order('id', { ascending: true })
  return {
    meals: data != null ? data : [],
    count: count
  }
})
