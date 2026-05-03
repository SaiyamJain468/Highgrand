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

  if (!image) throw new Error()

  try {
    await prisma.banner.create({
      data: { image, mobileImage, link, altText, isActive, displayOrder }
    })
  } catch (error) {
    throw new Error()
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
    throw new Error()
  }
  revalidatePath("/admin/banners")
  revalidatePath("/")
}

export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({ where: { id } })
  } catch (error) {
    throw new Error()
  }
  revalidatePath("/admin/banners")
  revalidatePath("/")
}
