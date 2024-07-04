import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/sign-in'

  cookies().delete('up-agencies.token')

  return NextResponse.redirect(redirectUrl)
}
