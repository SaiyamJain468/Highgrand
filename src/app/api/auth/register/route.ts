import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/lib/email"
import { getWelcomeEmailTemplate } from "@/lib/emailTemplates"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, password, businessName, businessType, city, state, monthlyVolume } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        role: "RESELLER",
        status: "PENDING",
        resellerProfile: {
          create: {
            businessName,
            businessType,
            city,
            state,
            monthlyVolume,
          }
        }
      }
    })

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: "Welcome to Highgrand - Application Received",
      html: getWelcomeEmailTemplate(name)
    })

    return NextResponse.json({ success: true, user: { id: user.id } })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
