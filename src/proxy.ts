import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAuthPage = path === '/login' || path === '/signup'
  const isVerifyEmailPage = path.startsWith('/verifyemail')

  const token = request.cookies.get('token')?.value || ''

  // Logged-in user should not access login/signup
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // Not logged-in user trying to access protected pages
  if (!isAuthPage && !isVerifyEmailPage && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail/:path*'
  ]
}
