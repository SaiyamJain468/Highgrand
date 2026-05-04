"use server"

import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"
import { getNewArrivalsEmailTemplate } from "@/lib/emailTemplates"

export async function checkAndNotifyNewProducts() {
  try {
    // 1. Get products added in the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const newProducts = await prisma.product.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    })

    if (newProducts.length < 5) {
      return { success: true, message: `Only ${newProducts.length} new products found. Threshold is 5. No mail sent.` }
    }

    // 2. Check if we've already sent an announcement this week
    const currentWeek = getWeekIdentifier(new Date())
    const lastSentWeek = await prisma.siteSettings.findUnique({
      where: { key: "last_product_announcement_week" }
    })

    if (lastSentWeek?.value === currentWeek) {
      return { success: true, message: "Announcement already sent for this week." }
    }

    // 3. Get all approved resellers
    const resellers = await prisma.user.findMany({
      where: {
        role: "RESELLER",
        status: "APPROVED"
      }
    })

    if (resellers.length === 0) {
      return { success: true, message: "No approved resellers to notify." }
    }

    // 4. Prepare product data for template
    const productsData = newProducts.map(p => {
      const images = JSON.parse(p.images)
      return {
        name: p.name,
        slug: p.slug,
        image: p.heroImage || images[0],
        wholesaleLabel: p.wholesaleLabel
      }
    })

    // 5. Send emails
    console.log(`Sending new arrivals digest to ${resellers.length} resellers...`)
    
    const sendPromises = resellers.map(reseller => {
      return sendEmail({
        to: reseller.email,
        subject: "NEW ARRIVALS: 5+ Fresh Drops at Highgrand",
        html: getNewArrivalsEmailTemplate(reseller.name, productsData)
      })
    })

    await Promise.all(sendPromises)

    // 6. Update last sent week
    await prisma.siteSettings.upsert({
      where: { key: "last_product_announcement_week" },
      update: { value: currentWeek },
      create: { key: "last_product_announcement_week", value: currentWeek }
    })

    return { success: true, message: `Successfully sent announcement to ${resellers.length} resellers.` }

  } catch (error: any) {
    console.error("FAILED TO SEND PRODUCT ANNOUNCEMENT:", error)
    return { success: false, error: error.message }
  }
}

function getWeekIdentifier(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${weekNo}`
}
