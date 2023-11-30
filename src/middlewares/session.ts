import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { Middleware } from ".";
import { getToken } from "next-auth/jwt";
import { getCsrfToken, getProviders } from "next-auth/react";
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
  '/admin'
]

export type Machin = {
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


  private async getMachin(request: NextRequest, callbackUrl: string): Promise<Machin> {
    const CSRFToken = await getCsrfToken() || ''

    const CSRFTokenHash = (await hash(`${CSRFToken}${process.env.NEXTAUTH_SECRET}`));
    const cookie = `${CSRFToken}|${CSRFTokenHash}`;

    const providers = await getProviders()

    if (!providers) {
      return { redirectUrl: '', isError: true }
    }

    if (Object.keys(providers!).length > 1) {
      return { redirectUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signin` }
    }

    const provider = Object.keys(providers)[0]


    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signin/${provider}`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1",
        cookie: `next-auth.csrf-token=${cookie}`,
      },
      credentials: "include",
      redirect: "follow",
      body: new URLSearchParams({
        csrfToken: CSRFToken,
        callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/${callbackUrl}`,
        json: "true",
      }),
    });

    if (!res.ok) {
      return { redirectUrl: '', isError: true }
    }

    const data = (await res.json()) as { url: string };

    return { redirectUrl: data.url, cookies: res.headers.get("set-cookie") ?? undefined }
  }

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {

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



export const sessionMiddleware = (next: NextMiddleware): MiddlewareResult => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return new SessionMiddleware(next).execute(request, _next);
  }
}





