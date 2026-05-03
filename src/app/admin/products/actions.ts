"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
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
  const isActive = formData.get("isActive") === "true"
  const isFeatured = formData.get("isFeatured") === "true"
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 0

  if (!name || !slug || !categoryId) throw new Error()

  try {
    await prisma.product.create({
      data: {
        name, slug, shortDescription, longDescription, categoryId, images,
        mrpLabel, wholesaleLabel, moqNote, gsm, composition, weave, finish, washCare,
        sizes, colors, tags, isActive, isFeatured, displayOrder
      }
    })
  } catch (error: any) {
    throw new Error()
  }

  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
  redirect("/admin/products")
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
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
  const isActive = formData.get("isActive") === "true"
  const isFeatured = formData.get("isFeatured") === "true"
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 0

  if (!name || !slug || !categoryId) throw new Error()

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name, slug, shortDescription, longDescription, categoryId, images,
        mrpLabel, wholesaleLabel, moqNote, gsm, composition, weave, finish, washCare,
        sizes, colors, tags, isActive, isFeatured, displayOrder
      }
    })
  } catch (error: any) {
    throw new Error()
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
    throw new Error()
  }

  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
}
