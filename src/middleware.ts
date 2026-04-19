import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  const path = request.nextUrl.pathname

  if (path.startsWith("/admin")) {
    if (path === "/admin/login") return NextResponse.next()
    
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (path.startsWith("/reseller")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    
    if (token.role !== "RESELLER" || token.status !== "APPROVED") {
      return NextResponse.redirect(new URL("/login?status=pending", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/reseller/:path*"]
}
