"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const slugify = (text: string) => text
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')     // Replace spaces with -
  .replace(/[^\w-]+/g, '')  // Remove all non-word chars
  .replace(/--+/g, '-')     // Replace multiple - with single -
  .replace(/^-+/, '')       // Trim - from start of text
  .replace(/-+$/, '')       // Trim - from end of text

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const rawSlug = formData.get("slug") as string
  const slug = slugify(rawSlug || name)
  const shortDescription = formData.get("shortDescription") as string
  const longDescription = formData.get("longDescription") as string
  const categoryId = formData.get("categoryId") as string
  const images = formData.get("images") as string || "[]"
  const mrpLabel = formData.get("mrpLabel") as string
  const wholesaleLabel = formData.get("wholesaleLabel") as string
  const moqNote = formData.get("moqNote") as string
  const gsm = parseInt(formData.get("gsm") as string) || 0
  const composition = formData.get("composition") as string
  const weave = formData.get("weave") as string
  const finish = formData.get("finish") as string
  const washCare = formData.get("washCare") as string
  const sizes = formData.get("sizes") as string || "[]"
  const colors = formData.get("colors") as string || "[]"
  const tags = formData.get("tags") as string || "[]"
  const customContent = formData.get("customContent") as string || "[]"
  const isActive = formData.get("isActive") === "true"
  const isFeatured = formData.get("isFeatured") === "true"
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 0
  const heroImage = formData.get("heroImage") as string
  const hoverImage = formData.get("hoverImage") as string

  if (!name || !slug || !categoryId) throw new Error("Missing required fields")

  let product;
  try {
    product = await prisma.product.create({
      data: {
        name, slug, shortDescription, longDescription, categoryId, images,
        mrpLabel, wholesaleLabel, moqNote, gsm, composition, weave, finish, washCare,
        sizes, colors, tags, customContent, isActive, isFeatured, displayOrder,
        heroImage, hoverImage
      }
    })
    
    revalidatePath("/admin/products")
    revalidatePath("/products")
    revalidatePath("/")
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error)
    throw new Error(error.message || "Failed to create product")
  }
  redirect(`/admin/products/${product.id}`)
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const rawSlug = formData.get("slug") as string
  const slug = slugify(rawSlug || name)
  const shortDescription = formData.get("shortDescription") as string
  const longDescription = formData.get("longDescription") as string
  const categoryId = formData.get("categoryId") as string
  const images = formData.get("images") as string || "[]"
  const mrpLabel = formData.get("mrpLabel") as string
  const wholesaleLabel = formData.get("wholesaleLabel") as string
  const moqNote = formData.get("moqNote") as string
  const gsm = parseInt(formData.get("gsm") as string) || 0
  const composition = formData.get("composition") as string
  const weave = formData.get("weave") as string
  const finish = formData.get("finish") as string
  const washCare = formData.get("washCare") as string
  const sizes = formData.get("sizes") as string || "[]"
  const colors = formData.get("colors") as string || "[]"
  const tags = formData.get("tags") as string || "[]"
  const customContent = formData.get("customContent") as string || "[]"
  const isActive = formData.get("isActive") === "true"
  const isFeatured = formData.get("isFeatured") === "true"
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 0
  const heroImage = formData.get("heroImage") as string
  const hoverImage = formData.get("hoverImage") as string

  if (!name || !slug || !categoryId) throw new Error("Missing required fields")

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name, slug, shortDescription, longDescription, categoryId, images,
        mrpLabel, wholesaleLabel, moqNote, gsm, composition, weave, finish, washCare,
        sizes, colors, tags, customContent, isActive, isFeatured, displayOrder,
        heroImage, hoverImage
      }
    })
  } catch (error: any) {
    console.error("UPDATE PRODUCT ERROR:", error)
    throw new Error(error.message || "Failed to update product")
  }

  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
  redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } })
  } catch (error: any) {
    console.error("DELETE PRODUCT ERROR:", error)
    throw new Error(error.message || "Failed to delete product")
  }

  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
}

export async function getMediaLibrary() {
  try {
    const products = await prisma.product.findMany({
      select: { images: true, heroImage: true, hoverImage: true }
    })
    const categories = await prisma.category.findMany({ select: { image: true } })
    
    const allUrls = new Set<string>()
    
    products.forEach(p => {
      if (p.images) {
        try {
          const imgs = JSON.parse(p.images)
          if (Array.isArray(imgs)) imgs.forEach(img => allUrls.add(img))
        } catch (e) {}
      }
      if (p.heroImage) allUrls.add(p.heroImage)
      if (p.hoverImage) allUrls.add(p.hoverImage)
    })
    
    categories.forEach(c => {
      if (c.image) allUrls.add(c.image)
    })

    return Array.from(allUrls).filter(url => url.startsWith('http'))
  } catch (error) {
    console.error("MEDIA LIBRARY ERROR:", error)
    return []
  }
}
