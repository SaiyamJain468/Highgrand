import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const slugify = (text: string) => text
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')     // Replace spaces with -
  .replace(/[^\w-]+/g, '')  // Remove all non-word chars
  .replace(/--+/g, '-')     // Replace multiple - with single -
  .replace(/^-+/, '')       // Trim - from start of text
  .replace(/-+$/, '')       // Trim - from end of text

async function main() {
  const products = await prisma.product.findMany()
  console.log(`Checking ${products.length} products...`)

  for (const product of products) {
    const cleanSlug = slugify(product.slug || product.name)
    if (product.slug !== cleanSlug) {
      console.log(`Updating ${product.name}: ${product.slug} -> ${cleanSlug}`)
      await prisma.product.update({
        where: { id: product.id },
        data: { slug: cleanSlug }
      })
    }
  }
  console.log("Cleanup complete!")
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
