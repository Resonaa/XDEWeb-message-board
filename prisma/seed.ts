import { exit } from "process";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.message.deleteMany({});

  console.log("Database has been seeded. 🌱");
}

seed()
  .catch(error => {
    console.error(error);
    exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
