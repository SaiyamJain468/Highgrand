const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  await prisma.product.deleteMany();
  console.log('Deleted all products');
}

clean()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
