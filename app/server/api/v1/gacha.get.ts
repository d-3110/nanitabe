import { serverSupabaseClient } from '#supabase/server'
import { object } from 'yup'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const query = getQuery(event)
  // 履歴から除外期間の結果を取得
  // const { histories } = await client.from('histories')
  // .select('')
  // .gte('created_at', query.from)
  // .lte('created_at', query.to)
  // console.log(histories)
  // let mealIds :Array<number> = []
  // if (histories.length > 0) {
  //   histories.forEach((history :any) => {
  //     mealIds.push(history.meal_id)
  //   })
  // }

  const { data } = await client.from('meals')
  .select('id, name, tag')
  .in('type', Array.isArray(query.types) ? query.types : [query.types])
  .contains('tag', Array.isArray(query.tags) ? query.tags : [query.tags])
  // console.log(data)
  return data
})
