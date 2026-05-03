"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CatStatus } from "@prisma/client"

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as CatStatus
  const displayOrder = parseInt((formData.get("displayOrder") as string) || "0")

  if (!name || !slug) throw new Error()

  try {
    await prisma.category.create({
      data: { name, slug, description, image, status, displayOrder }
    })
  } catch (error: any) {
    throw new Error()
  }

  revalidatePath("/admin/categories")
  revalidatePath("/")
  redirect("/admin/categories")
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as CatStatus
  const displayOrder = parseInt((formData.get("displayOrder") as string) || "0")

  if (!name || !slug) throw new Error()

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug, description, image, status, displayOrder }
    })
  } catch (error: any) {
    throw new Error()
  }

  revalidatePath("/admin/categories")
  revalidatePath("/")
  redirect("/admin/categories")
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
  } catch (error: any) {
    throw new Error()
  }

  revalidatePath("/admin/categories")
  revalidatePath("/")
}
