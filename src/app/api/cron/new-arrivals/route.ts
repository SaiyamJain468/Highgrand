import { NextResponse } from "next/server"
import { checkAndNotifyNewProducts } from "@/app/admin/actions/emailActions"

// Secure this route with a CRON_SECRET if needed, 
// but for now we'll rely on the logic inside which prevents double-sending
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await checkAndNotifyNewProducts()
  return NextResponse.json(result)
}
