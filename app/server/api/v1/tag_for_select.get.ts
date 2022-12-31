import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();
  const tags = await prisma.tags.findMany();
  const result = <Array<String>>([])
  tags.forEach(tag => {
    result.push(tag.name)
  })
  return result
});