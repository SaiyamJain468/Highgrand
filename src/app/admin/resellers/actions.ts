"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function approveReseller(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "RESELLER",
        resellerStatus: "APPROVED"
      }
    })
  } catch (error) {
    return { error: "Failed to approve" }
  }
  revalidatePath("/admin/resellers")
}

export async function rejectReseller(id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: "USER",
        resellerStatus: "REJECTED"
      }
    })
  } catch (error) {
    return { error: "Failed to reject" }
  }
  revalidatePath("/admin/resellers")
}
