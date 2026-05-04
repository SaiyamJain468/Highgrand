"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function resetPassword(prevState: any, formData: FormData) {
  const token = formData.get("token") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!token || !password) {
    return { error: "Missing required information" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return { error: "Invalid or expired reset link. Please request a new one." }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    return { success: true, message: "Password has been successfully updated." }
  } catch (error: any) {
    console.error("Reset password error:", error.message || error)
    return { error: `Failed to reset password: ${error.message || "Unknown error"}` }
  }
}
