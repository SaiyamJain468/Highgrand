"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CatStatus } from "@prisma/client"

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function createCategory(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as CatStatus
  const displayOrder = parseInt((formData.get("displayOrder") as string) || "0")

  if (!name || !slug) {
    return { error: "Name and Slug are required" }
  }

  try {
    await prisma.category.create({
      data: { name, slug, description, image, status, displayOrder }
    })
    
    revalidatePath("/admin/categories")
    revalidatePath("/products")
    revalidatePath("/")
  } catch (error: any) {
    console.error("CREATE CATEGORY ERROR:", error)
    return { error: error.message || "Failed to create category" }
  }

  redirect("/admin/categories")
}

export async function updateCategory(prevState: ActionState, id: string, formData: FormData): Promise<ActionState> {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as CatStatus
  const displayOrder = parseInt((formData.get("displayOrder") as string) || "0")

  if (!name || !slug) {
    return { error: "Name and Slug are required" }
  }

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug, description, image, status, displayOrder }
    })
    
    revalidatePath("/admin/categories")
    revalidatePath("/products")
    revalidatePath("/")
  } catch (error: any) {
    console.error("UPDATE CATEGORY ERROR:", error)
    return { error: error.message || "Failed to update category" }
  }

  redirect("/admin/categories")
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
  } catch (error: any) {
    throw new Error()
  }

  revalidatePath("/admin/categories")
  revalidatePath("/products")
  revalidatePath("/")
}
