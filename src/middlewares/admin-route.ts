import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

import { Middleware } from ".";
import { MiddlewareResult } from "./factory";

export default class AdminRouteMiddleware extends Middleware {
  checkRoute(request: NextRequest): boolean {
    return request.nextUrl.pathname.startsWith('/api/admin')
  }

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    const key = request.headers.get('api-key');

    const result = process.env.CACHE_API_KEY

    const headers = new Headers(request.headers);

    if (result === undefined) {
      console.warn("CACHE_API_KEY not found in .env")
      return NextResponse.json({ error: 'Forbidden' }, {
        status: 403,
        headers
      })
    }

    if (key === null || key !== result) {
      console.warn("CACHE_API_KEY not match with key: ", key)
      return NextResponse.json({ error: 'Forbidden' }, {
        status: 403,
        headers
      })
    }

    return this.next(request, _next)
  }

  constructor(next: NextMiddleware) {
    super(next)
  }
}

export const adminRouteMiddleware = (next: NextMiddleware): MiddlewareResult => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return new AdminRouteMiddleware(next).execute(request, _next);
  }
}