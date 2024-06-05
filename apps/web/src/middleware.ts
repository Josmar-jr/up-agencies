import { type NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'
import { decrypt } from './lib/session'
import dayjs from 'dayjs'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/sing-up', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie: string | undefined = cookies().get('up-agencies.token')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.sub &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
