import { PrismaClient, Role, CatStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1 admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@highgrand.in'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'password123'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN,
      status: 'APPROVED',
    },
  })
  console.log({ admin })

  // Categories
  const oversized = await prisma.category.upsert({
    where: { slug: 'oversized-tshirts' },
    update: {},
    create: {
      name: 'Oversized T-Shirts',
      slug: 'oversized-tshirts',
      status: CatStatus.ACTIVE,
      displayOrder: 1,
    },
  })

  const comingSoonCats = [
    { name: 'Polo T-Shirts', slug: 'polo-tshirts' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Cargo Pants', slug: 'cargo-pants' },
    { name: 'Joggers', slug: 'joggers' },
    { name: 'Sweatshirts', slug: 'sweatshirts' },
  ]

  for (const cat of comingSoonCats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        status: CatStatus.COMING_SOON,
      },
    })
  }

  // 1 sample product
  await prisma.product.upsert({
    where: { slug: 'premium-oversized-black' },
    update: {},
    create: {
      name: 'Premium Oversized T-Shirt - Black',
      slug: 'premium-oversized-black',
      shortDescription: 'Classic black oversized fit',
      longDescription: 'Our signature oversized fit crafted with premium combed cotton.',
      categoryId: oversized.id,
      images: JSON.stringify(['https://via.placeholder.com/600x800']),
      mrpLabel: '₹850/piece',
      wholesaleLabel: '₹420/piece',
      moqNote: 'No minimum order',
      gsm: 220,
      composition: '100% Super Combed Cotton',
      weave: 'Single Jersey',
      finish: 'Bio-washed',
      washCare: 'Machine wash cold. Do not bleach. Tumble dry low.',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify([{ name: 'Black', hex: '#000000', image: '' }]),
      isActive: true,
      isFeatured: true,
    },
  })

  // SiteSettings
  const settings = [
    { key: 'announcement_text', value: 'FREE SAMPLES FOR NEW RESELLERS · CALL NOW: +91 9876543210 · 650+ ACTIVE RESELLERS ACROSS INDIA' },
    { key: 'whatsapp_number', value: '919876543210' },
    { key: 'phone_number', value: '+91 98765 43210' },
    { key: 'contact_email', value: 'info@highgrand.in' },
  ]

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
