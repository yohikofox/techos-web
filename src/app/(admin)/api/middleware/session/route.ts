import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { getRedirectData } from "./getRedirectData";



export async function GET(request: NextRequest, params: any) {

  const callbackUrl = new URL(request.url).searchParams.get('callbackUrl')

  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!session) {

    const response = await getRedirectData(request, callbackUrl || '/')

    if (response.isError) {
      return NextResponse.json({ error: 'Forbidden' }, {
        status: 403,
        headers: new Headers(request.headers)
      })
    }

    return NextResponse.json(response)
  }

  return NextResponse.next({ headers: new Headers(request.headers) })
}