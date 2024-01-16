import NextAuthManager from "R/src/infrastructure/auth/nextAuthManager";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { RedirectData } from "R/src/middlewares/session";
import { headers } from 'next/headers';

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, params: any) {
  const callbackUrl = new URL(request.url).searchParams.get('callbackUrl')

  const response = await new NextAuthManager().getSignOutRedirectData(callbackUrl || '/', { headers: new Headers(request.headers) })

  if (response.isError) {
    return NextResponse.json({ error: 'Forbidden' }, {
      status: 403,
      headers: new Headers(request.headers)
    })
  }

  const responseHeaders = new Headers()

  responseHeaders.set('set-cookie', response.cookies ?? '')
  responseHeaders.set('Cache-Control', 'no-store')

  return NextResponse.json(response, {
    headers: responseHeaders
  })
}