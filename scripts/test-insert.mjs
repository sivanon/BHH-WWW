import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const rs = await prisma.news.create({
    data: { title: "Test DB", category: "pr" }
  });
  console.log("Insert Success: " + rs.id);
}
main().catch(console.error).finally(() => prisma.$disconnect())
