const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const username = "BHHadmin11141";
  const rawPassword = "11141BHHadmin";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Upsert the user using the username as the "email" field in DB
  const user = await prisma.user.upsert({
    where: { email: username },
    update: {
      password: hashedPassword,
    },
    create: {
      email: username,
      name: "Super Admin",
      password: hashedPassword,
    },
  });

  console.log("Admin generated:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
