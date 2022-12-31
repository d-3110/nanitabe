import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const params = await readBody(event);
  const meal = await prisma.meals.create({
    data: {
      name: params.name,
      type: params.type,
      note: params.note,
    },
  });
  return meal;
});