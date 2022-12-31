import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();
  const tags = await prisma.tags.findMany();
  console.log(' apiだよ')
  return tags;
});