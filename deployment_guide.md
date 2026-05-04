# Highgrand Final Deployment Guide (Step-by-Step)

Follow this manual EXACTLY in order. It contains all the remaining steps you need to do to get the site live on `highgrand.in` with your real data.

## STEP 1: Fix the Database Connection for Deployment
Right now, your `.env` says `localhost`. This is perfect for when the site is actually hosted on Hostinger. 
**Action:** Do not change the `DATABASE_URL` if you are uploading this to Hostinger. It is correct.

## STEP 2: Push the Database Tables to Hostinger
Before your website can work, we need to create the `User`, `Product`, `Category`, etc., tables inside your empty Hostinger database.
Because `localhost` won't work from your personal laptop, you must do this from your Hostinger terminal/SSH or use Hostinger's Remote MySQL.

**Easiest way (Remote MySQL):**
1. Go to Hostinger hPanel -> Databases -> Remote MySQL.
2. Add your laptop's IP address (or select "Any Host" `%` temporarily).
3. On your laptop, temporarily change `.env` to use Hostinger's IP address instead of `localhost`. (e.g., `mysql://u376752023_highgrand:Highgrand468@srv223.hstgr.io:3306/u376752023_highgrand`).           
4. Run `npx prisma db push` in your VS Code terminal. (This creates all tables).
5. **CRITICAL:** Change the `.env` file back to `localhost` before uploading the code to Hostinger!

## STEP 3: Setup Cloudinary (For Image Uploads)
Your admin panel needs a place to store uploaded images (banners, product images).
1. Go to [Cloudinary.com](https://cloudinary.com/) and create a free account.
2. Go to Settings -> Upload -> Add Upload Preset.
3. Set the "Signing Mode" to **Unsigned**.
4. Name the preset `highgrand_uploads`.
5. Get your "Cloud Name" from the Cloudinary dashboard.
6. Add these to your `.env` file (or Hostinger environment variables):
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="djxhuaqpc"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="highgrand_uploads"
```

## STEP 4: Setup SMTP (For Automated Emails)
To send Welcome and Approval emails automatically to your resellers, you need to configure an SMTP service. The easiest way is to use a free service like Resend, SendGrid, or your Hostinger Webmail.
1. Create an email account in Hostinger (e.g., `info@highgrand.in`).
2. Get your SMTP details from Hostinger (Host, Port, User, Password).
3. Add these to your `.env` file (or Hostinger environment variables):
```env
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_USER="admin@highgrand.in"
SMTP_PASS="Highgrand1@"
SMTP_FROM="admin@highgrand.in"
```

## STEP 5: Upload Code to Hostinger
1. Push your final code to GitHub (`SaiyamJain468/Highgrand`).
2. Go to Hostinger -> Websites -> highgrand.in -> Advanced -> GIT.
3. Deploy your repository.
4. Ensure your Node.js version in Hostinger is set to 18 or 20.
5. In Hostinger, set up your `.env` variables or make sure the `.env` file is uploaded.
6. Run the build command: `npm install && npx prisma generate && npm run build`.
7. Start the app: `npm run start`.

## STEP 6: Create Your Admin Account
Once the website is live on `highgrand.in`:
1. Go to `https://highgrand.in/register` (or whatever your sign-up page is) and create an account for yourself (e.g., `saiyam@highgrand.in`).
2. Go to Hostinger -> Databases -> phpMyAdmin.
3. Open the `u376752023_highgrand` database.
4. Open the `User` table.
5. Find your newly created account and change the `role` column from `USER` to `ADMIN`.

## STEP 7: Populate the Site (The Fun Part)
Now that you are an Admin, log into the live site and go to `https://highgrand.in/admin`.
1. **Settings**: Go to Settings and update your WhatsApp number and Top Marquee text.
2. **Banners**: Upload your 3 main Hero banners (Desktop and Mobile versions).
3. **Categories**: Create your categories (e.g., "Oversized Tees", "Heavyweight Hoodies") and upload category images.
4. **Products**: Add your products. Make sure to toggle "Is Featured" for the ones you want on the homepage.
5. **Testimonials**: (Optional) Add your customer reviews if you want them on the homepage.

**You are now fully live!**
