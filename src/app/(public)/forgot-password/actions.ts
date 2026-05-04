"use server"

import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"
import { getPasswordResetEmailTemplate } from "@/lib/emailTemplates"
import crypto from "crypto"
import { headers } from "next/headers"

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // For security reasons, don't reveal if user exists
      return { success: true, message: "If an account exists with that email, a reset link has been sent." }
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expiry = new Date(Date.now() + 3600000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry
      }
    })

    const host = (await headers()).get("host")
    const isLocal = host?.includes("localhost")
    const baseUrl = isLocal ? `http://${host}` : (process.env.NEXTAUTH_URL || `https://${host}`)
    const resetUrl = `${baseUrl}/reset-password?token=${token}`
    
    await sendEmail({
      to: email,
      subject: "Reset Your Highgrand Password",
      html: getPasswordResetEmailTemplate(user.name, resetUrl)
    })

    return { success: true, message: "If an account exists with that email, a reset link has been sent." }
  } catch (error: any) {
    console.error("Password reset request error:", error.message || error)
    return { error: `Failed to process request: ${error.message || "Unknown error"}` }
  }
}
