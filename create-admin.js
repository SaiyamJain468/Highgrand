const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = "saiyam@highgrand.in";
  const password = "adminpassword123"; // Tell the user this password
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log("User already exists! Making them admin...");
    const updated = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN', status: 'APPROVED' }
    });
    console.log("Updated:", updated);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await prisma.user.create({
    data: {
      name: "Saiyam Jain",
      email: email,
      passwordHash: hashedPassword,
      phone: "+91 0000000000",
      role: 'ADMIN',
      status: 'APPROVED'
    }
  });

  console.log("Created Admin User:", newUser.email);
}

main().finally(() => prisma.$disconnect());
