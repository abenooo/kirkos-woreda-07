import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there's no session and trying to access protected routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard') && req.nextUrl.pathname !== '/dashboard/login') {
    return NextResponse.redirect(new URL('/dashboard/login', req.url))
  }

  // If there's a session and trying to access login page
  if (session && req.nextUrl.pathname === '/dashboard/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
} 