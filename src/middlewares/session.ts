import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { Middleware } from ".";
import { getToken } from "next-auth/jwt";
import { MiddlewareResult } from "./factory";
import { NextMiddlewareResult } from "next/dist/server/web/types";


/**
 * This hash function relies on Edge Runtime.
 * Importing node.js crypto module will throw an error.
 */
export async function hash(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const PATTERNS = [
  '/api/admin',
  '/admin',
  '/post',
  // '/logout',
]

export type RedirectData = {
  redirectUrl: string,
  cookies?: string,
  isError?: boolean
}

export default class SessionMiddleware extends Middleware {
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

    if (session) return this.next(request, _next)

    const pathName = request.headers.get('x-pathname')

    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/middleware/session?callbackUrl=${pathName}`, {
      next: {
        revalidate: 0
      }
    })

    const { redirectUrl, cookies, isError } = await response.json() as RedirectData

    if (isError) {
      return NextResponse.next({ headers: new Headers(request.headers) })
    }

    const responseHeaders = new Headers(response.headers)

    if (cookies) {
      responseHeaders.set('set-cookie', cookies)
    }

    return NextResponse.redirect(redirectUrl, {
      status: 302,
      headers: responseHeaders,
    });
  }

  constructor(next: NextMiddleware) {
    super(next)
  }
}



export const sessionMiddleware = (next: NextMiddleware): MiddlewareResult => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return new SessionMiddleware(next).execute(request, _next);
  }
}





