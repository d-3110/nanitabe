import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const params = await readBody(event)
  const client = serverSupabaseClient(event)

  const { data } = await client.from('histories')
    .insert({
      meal_id: params.meal_id,
    })
    .select('*')
    .single()
})
