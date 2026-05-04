import { PrismaClient } from '@prisma/client'
import { cache } from 'react'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaBase = globalForPrisma.prisma ?? new PrismaClient(
  process.env.DATABASE_URL 
    ? {
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      }
    : undefined
)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaBase

// Add caching wrapper for frequently used queries
export const prisma = prismaBase

// Cached queries for cross-component performance
export const getSiteSettings = cache(async () => {
  return await prismaBase.siteSettings.findMany()
})
