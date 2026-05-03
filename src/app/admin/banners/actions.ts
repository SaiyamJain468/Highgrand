"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createBanner(formData: FormData) {
  const image = formData.get("image") as string
  const mobileImage = formData.get("mobileImage") as string
  const link = formData.get("link") as string
  const altText = formData.get("altText") as string || "Hero Banner"
  const isActive = formData.get("isActive") === "true"
  const displayOrder = parseInt(formData.get("displayOrder") as string) || 0

  if (!image) return { error: "Image URL is required" }

  try {
    await prisma.banner.create({
      data: { image, mobileImage, link, altText, isActive, displayOrder }
    })
  } catch (error) {
    return { error: "Failed to create banner" }
  }

  revalidatePath("/admin/banners")
  revalidatePath("/")
  redirect("/admin/banners")
}

export async function toggleBanner(id: string, currentStatus: boolean) {
  try {
    await prisma.banner.update({
      where: { id },
      data: { isActive: !currentStatus }
    })
  } catch (error) {
    return { error: "Failed to toggle banner" }
  }
  revalidatePath("/admin/banners")
  revalidatePath("/")
}

export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({ where: { id } })
  } catch (error) {
    return { error: "Failed to delete banner" }
  }
  revalidatePath("/admin/banners")
  revalidatePath("/")
}
