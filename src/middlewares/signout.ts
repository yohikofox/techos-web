import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { Middleware } from ".";
import { getToken } from "next-auth/jwt";
import { MiddlewareResult } from "./factory";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { RedirectData, hash } from "./session";
import CookieManager from "../infrastructure/cookie";

const PATTERNS = [
  '/api/auth/logout',
  '/logout',
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

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {

    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!session) return this.next(request, _next)

    const cookieManager = new CookieManager(request.headers.get("cookie") ?? '')

    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/middleware/session/signout?callbackUrl=${"/admin"}`, {
      headers: {
        cookie: cookieManager.render()
      },
      next: {
        revalidate: 0
      }
    })

    const { redirectUrl, cookies, isError } = await response.json() as RedirectData

    if (isError) {
      return NextResponse.next({ headers: new Headers(request.headers) })
    }

    return NextResponse.redirect(redirectUrl, {
      status: 302,
      headers: {
        "Set-Cookie": cookies ?? "",
      },
    });

    // return this.next(request, _next)
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