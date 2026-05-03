"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveSettings(formData: FormData) {
  const announcementText = formData.get("announcementText") as string
  const whatsappNumber = formData.get("whatsappNumber") as string

  try {
    // Upsert announcementText
    await prisma.siteSettings.upsert({
      where: { key: "announcementText" },
      update: { value: announcementText },
      create: { key: "announcementText", value: announcementText }
    })

    // Upsert whatsappNumber
    await prisma.siteSettings.upsert({
      where: { key: "whatsappNumber" },
      update: { value: whatsappNumber },
      create: { key: "whatsappNumber", value: whatsappNumber }
    })
  } catch (error) {
    throw new Error()
  }

  revalidatePath("/admin/settings")
  revalidatePath("/")
  revalidatePath("/(public)")
}
