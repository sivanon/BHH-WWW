import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const news = await prisma.news.findMany({take: 5, orderBy: { date: 'desc' }})
  console.log("Last 5 News Items:")
  news.forEach(n => {
    console.log(`- ID: ${n.id}`)
    console.log(`  Title: ${n.title}`)
    console.log(`  imageURL: ${n.imageUrl}`)
  })
}
main().catch(console.error).finally(() => prisma.$disconnect())
