# Highgrand Project Manual

## Introduction
Welcome to the Highgrand B2B Storefront Manual. This document provides essential instructions for managing the site, the database, and other key administrative duties.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL (Hosted on Hostinger)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion & GSAP (for complex 3D/scrolling)

## Admin Panel Features
The Admin Panel (`/admin`) allows you to control the dynamic data on the storefront:
1. **Categories**: Create and manage product categories (e.g., Oversized Tees, Heavyweight Hoodies).
2. **Products**: Add new products, specifying retail and wholesale prices, GSM, composition, and images.
3. **Resellers**: Review applications from businesses wanting to buy wholesale. Approve them to unlock wholesale pricing.
4. **Inquiries**: View contact form submissions.
5. **Banners**: Manage the hero banners displayed on the home page.
6. **Settings**: Control global settings like the top announcement marquee and WhatsApp number.

## Database Management & Backup Strategy

Since Highgrand uses a live MySQL database hosted on Hostinger, backing up your data is critical for disaster recovery.

### Manual Backups via Hostinger
1. Log into your **Hostinger Panel (hPanel)**.
2. Navigate to **Databases > phpMyAdmin**.
3. Select your Highgrand database.
4. Click on the **Export** tab.
5. Choose **Quick** export method and **SQL** format.
6. Click **Go** to download the `.sql` backup file to your local computer.

### Automated Backups
Hostinger provides automated daily or weekly backups depending on your hosting plan.
To check this:
1. Go to **Files > Backups** in your hPanel.
2. Ensure database backups are being generated regularly.
3. You can restore directly from this interface if needed.

### Prisma Schema Updates
If you ever need to add new features or modify the database schema:
1. Update `prisma/schema.prisma` in your local codebase.
2. Run `npx prisma db push` to sync changes to the live database (or use migrations: `npx prisma migrate dev`).
3. Run `npx prisma generate` to update your Prisma client.

## Deploying Updates
The site is deployed on Hostinger/Vercel. If deployed on Vercel:
- Pushing to the `main` branch on GitHub (`SaiyamJain468/Highgrand`) will automatically trigger a new deployment.
- Ensure your production `.env` variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, etc.) are configured in the Vercel dashboard.

*Made by Saiyam Jain*
*https://github.com/SaiyamJain468/Highgrand*
