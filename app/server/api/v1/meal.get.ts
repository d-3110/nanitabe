import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();
  const meals = await prisma.meals.findMany({
    where: {
      id: 1
    }
  });
  return meals;
});