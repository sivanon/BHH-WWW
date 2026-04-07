import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testSearch(q) {
  try {
    const pages = await prisma.pageContent.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 2
    });
    console.log("Pages found:", pages.length);

    const doctors = await prisma.doctor.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { specialty: { contains: q, mode: 'insensitive' } }
          ]
        },
        take: 2
    });
    console.log("Doctors found:", doctors.length);

    console.log("SUCCESS");
  } catch(e) {
    console.error("FAILED", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

testSearch("test");
