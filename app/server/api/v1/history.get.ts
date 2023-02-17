import { serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE, getStartIndex } from '~~/utils/common'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const params = getQuery(event)
  const startIndex = getStartIndex('page' in params ? Number(params.page) : 1)
  let query = client.from('histories')
                    .select(`*,meals(name, tag)`,{ count: 'exact' })
                    .range(startIndex, startIndex + (PAGE_SIZE - 1))

  if ('isAll' in params) {
    if (params.isAll == 'false') {
      query.gte('created_at', params.from).lte('created_at', params.to)
    }
  }
  const { data, count } = await query.order('id', { ascending: false })
  return {
    histories: data != null ? data : [],
    count: count
  }
})
