# Highgrand Deployment To-Do List

Follow this checklist to get your site fully operational with the new dynamic database and admin panel.

- [ ] **Read `manual.md`**: Understand how the database, NextAuth, and Cloudinary interact.
- [ ] **Configure Hostinger MySQL**: Create a database on Hostinger and copy the connection string.
- [ ] **Configure Cloudinary**: Create a Cloudinary account, set up an unsigned upload preset, and copy your API keys.
- [ ] **Generate NextAuth Secret**: Create a random string for `NEXTAUTH_SECRET`.
- [ ] **Update `.env`**: Add all the variables from the steps above into your `.env` (or Hostinger/Vercel environment settings).
- [ ] **Push Database Schema**: Run `npx prisma db push` (or `npx prisma migrate deploy`) in your terminal or via your deployment pipeline to create the tables in your Hostinger MySQL database.
- [ ] **Create an Admin Account**: Register a new account on the site, then go into phpMyAdmin on Hostinger and change your `role` column to `ADMIN`.
- [ ] **Populate Categories**: Log into `/admin`, go to Categories, and create your product categories (e.g., Oversized Tees, Polos) and upload their images.
- [ ] **Populate Products**: Go to the Products tab in the admin panel and add all your real inventory. Ensure they are linked to the categories you just created.
- [ ] **Populate Banners & Testimonials**: Add any carousel banners and testimonials you want shown on the home page.
- [ ] **Test the Public Site**: Visit your homepage to ensure it's successfully loading the real data you just inputted!
