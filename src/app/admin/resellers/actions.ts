"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

import { sendEmail } from "@/lib/email"
import { getApprovalEmailTemplate, getRejectionEmailTemplate } from "@/lib/emailTemplates"

export async function approveReseller(id: string) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: "RESELLER",
        status: "APPROVED"
      }
    })

    // Send Approval Email
    await sendEmail({
      to: user.email,
      subject: "Highgrand Reseller Application Approved",
      html: getApprovalEmailTemplate(user.name)
    })

  } catch (error) {
    throw new Error()
  }
  revalidatePath("/admin/resellers")
}

export async function rejectReseller(id: string) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        role: "RESELLER",
        status: "REJECTED"
      }
    })

    // Send Rejection Email
    await sendEmail({
      to: user.email,
      subject: "Highgrand Reseller Application Update",
      html: getRejectionEmailTemplate(user.name)
    })
  } catch (error) {
    console.error("REJECT RESELLER ERROR:", error)
    throw new Error("Failed to reject reseller")
  }
  revalidatePath("/admin/resellers")
}
