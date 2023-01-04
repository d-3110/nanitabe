import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)
  // 履歴から除外期間の結果を取得
  // const { mealIds } = await client.from('histories')
  // .select('meal_id')
  // .gte('created_at', params.from)
  // .lte('created_at', params.to)

  // const { meals } = await client.from('meals')
  // .select('id', 'name')
  // .in('type', params.types)
  // .contained('tag', params.tags)
console.log('結果')
console.log(params)
})
