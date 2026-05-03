"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function markAsRead(id: string) {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: "SEEN" }
    })
  } catch (error) {
    throw new Error()
  }
  revalidatePath("/admin/inquiries")
}
