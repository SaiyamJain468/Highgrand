"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function approveReseller(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "RESELLER",
        status: "APPROVED"
      }
    })
  } catch (error) {
    throw new Error()
  }
  revalidatePath("/admin/resellers")
}

export async function rejectReseller(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "RESELLER",
        status: "REJECTED"
      }
    })
  } catch (error) {
    throw new Error()
  }
  revalidatePath("/admin/resellers")
}
