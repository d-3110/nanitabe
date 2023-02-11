import { serverSupabaseClient } from '#supabase/server'
import _ from 'lodash'

export default eventHandler(async (event) => {
  const mealClient = serverSupabaseClient(event)
  const historyClient = serverSupabaseClient(event)
  const query = getQuery(event)
  const mealIds = query.isReject ? [] : await getRejectMealIds(historyClient, query.from, query.to)
  let meals: any
  if (mealIds.length > 0) {
    const { data } = await mealClient.from('meals')
                    .select('id, name, tag')
                    .in('type', Array.isArray(query.types) ? query.types : [query.types])
                    .not('id', 'in', '('+ mealIds.join(',') +')')
                    .contains('tag', Array.isArray(query.tags) ? query.tags : [query.tags])
    meals = data
  } else {
    const { data } = await mealClient.from('meals')
                    .select('id, name, tag')
                    .in('type', Array.isArray(query.types) ? query.types : [query.types])
                    .contains('tag', Array.isArray(query.tags) ? query.tags : [query.tags])
    meals = data
  }
  return meals[_.random(0, meals.length - 1)]
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
