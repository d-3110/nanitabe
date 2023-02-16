import { serverSupabaseClient } from '#supabase/server'
import _ from 'lodash'

export default eventHandler(async (event) => {
  const mealClient = serverSupabaseClient(event)
  const historyClient = serverSupabaseClient(event)
  const params = getQuery(event)
  const mealIds = params.isReject == 'true' ? await getRejectMealIds(historyClient, params.from, params.to) : []
  let query = mealClient.from('meals')
                        .select('id, name, tag')
                        .in('type', Array.isArray(params.types) ? params.types : [params.types])
  if ('tags' in params) {
    if ('isTagAnd' in params) {
      params.isTagAnd == 'true'
        ? query.contains('tag', Array.isArray(params.tags) ? params.tags : [params.tags])
        : query.overlaps('tag', Array.isArray(params.tags) ? params.tags : [params.tags])
    }
  }
  if (mealIds.length > 0) {
    query = query.not('id', 'in', '(' + mealIds.join(',') + ')')
  }
  const { data } = await query
  if (data == null) {
    return {}
  }
  return data[_.random(0, data.length - 1)]
})

const getRejectMealIds = async (client: any, from: any, to: any) => {
  // 履歴から除外期間の結果を取得
  const { data } = await client.from('histories')
                  .select()
                  .gte('created_at', from)
                  .lte('created_at', to)
  let mealIds :Array<number> = []
  if (data.length > 0) {
    data.forEach((history :any) => {
      mealIds.push(history.meal_id)
    })
  }
  return _.uniq(mealIds)
}
