import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { Middleware } from ".";
import { getToken } from "next-auth/jwt";
import { getCsrfToken } from "next-auth/react";
import { MiddlewareResult } from "./factory";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { Machin, hash } from "./session";

const PATTERNS = [
  '/api/auth/logout',
]

export default class SignOutMiddleware extends Middleware {
  checkRoute(request: NextRequest): boolean {
    for (const pattern of PATTERNS) {
      if (request.nextUrl.pathname.startsWith(pattern)) {
        return true
      }
    }
    return false
  }


  private async getMachin(request: NextRequest, callbackUrl: string): Promise<Machin> {
    const CSRFToken = await getCsrfToken() || ''

    const CSRFTokenHash = (await hash(`${CSRFToken}${process.env.NEXTAUTH_SECRET}`));
    // const cookie = `${CSRFToken}|${CSRFTokenHash}`;

    const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signout`
    const csrf = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/csrf`)

    const fetchResponse = await fetch(`${url}?callbackUrl=/api/auth/session`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: await csrf.text()
    })


    return { redirectUrl: callbackUrl, cookies: undefined }
  }

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (session) {

      const pathName = request.headers.get('x-pathname')

      const { redirectUrl, cookies, isError } = await this.getMachin(request, pathName || '')

      if (isError) {
        return NextResponse.next({ headers: new Headers(request.headers) })
      }

      return NextResponse.redirect(redirectUrl, {
        status: 302,
        headers: {
          "Set-Cookie": cookies ?? "",
        },
      });
    }

    return this.next(request, _next)
  }

  constructor(next: NextMiddleware) {
    super(next)
  }
}



export const signOutMiddleware = (next: NextMiddleware): MiddlewareResult => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // return NextResponse.next({ headers: new Headers(request.headers) })
    return new SignOutMiddleware(next).execute(request, _next);
  }
}


/**
  await fetch('/api/auth/signout?callbackUrl=/api/auth/session', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    body: await fetch('/api/auth/csrf').then(rs => rs.text())
  }); 

 * */