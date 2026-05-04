"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendEmail } from "@/lib/email"

export async function createInquiry(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  if (!name || !phone || !message) {
    return { error: "All fields are required" }
  }

  try {
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        message,
        status: "NEW"
      }
    })

    // Notify Admin (optional but recommended)
    try {
      await sendEmail({
        to: "admin@highgrand.in",
        subject: `New Inquiry from ${name}`,
        html: `
          <h3>New Website Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      })
    } catch (e) {
      console.error("Failed to send admin notification email")
    }

    revalidatePath("/admin/inquiries")
    return { success: true }
  } catch (error) {
    console.error("Inquiry creation error:", error)
    return { error: "Something went wrong. Please try again later." }
  }
}
