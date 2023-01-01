import { meals, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMeals = async (params) => {
  const meal = await prisma.meals.create({
    data: {
      name: params.name,
      type: Number(params.type),
      note: params.note,
    },
  })
  return meal
}

const upsertTags = async (tags: Array<string>) => {
  // map関数でupsertのクエリを複数作成
  const query = tags.map(tag => (
    prisma.tags.upsert({
      where: {
        name: tag,
      },
      update: {
        name: tag,
      },
      create: {
        name: tag,
      },
    })
  ))
  // $transaction APIで同一トランザクションで実行
  const result = await prisma.$transaction([...query])
}

const createMealTags = async (meal: meals, params) => {
  // selet tags
  const tags = await prisma.tags.findMany({
    where: {
      name: {
        in: params.tags
      },
    },
  })
  
  let insert = <Array<any>>([])
  tags.forEach(tag => {
    insert.push({ meal_id: meal.id, tag_id: tag.id })
  })

  await prisma.meal_tags.createMany({
    data: insert
  })
}

export default defineEventHandler(async (event) => {
  const params = await readBody(event);
  const meal = await createMeals(params)
  await upsertTags(params.tags)
  await createMealTags(meal, params)
  return meal
})