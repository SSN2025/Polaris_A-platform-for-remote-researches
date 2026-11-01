const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'polaris-admin-2026';

  console.log(`Checking admin user: ${username}...`);

  const existing = await prisma.admin.findUnique({
    where: { username },
  });

  if (existing) {
    console.log(`Admin user "${username}" already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      name: 'NCPOR Administrator',
      role: 'admin',
    },
  });

  console.log(`Created default admin user: ${admin.username} (Password: ${password})`);
}

main()
  .catch((e) => {
    console.error('Error seeding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

