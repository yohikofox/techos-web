import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { Middleware } from ".";
import Container from "@/infrastructure/dependencyFactory";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { MiddlewareResult } from "./factory";
import { NextMiddlewareResult } from "next/dist/server/web/types";

export default class AdminRouteMiddleware extends Middleware {
  checkRoute(request: NextRequest): boolean {
    return request.nextUrl.pathname.startsWith('/api/admin')
  }

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    const key = request.headers.get('api-key');

    const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

    const result = await configManager.get("CACHE_API_KEY")

    const headers = new Headers(request.headers);

    if (!result) {
      console.warn("CACHE_API_KEY not found in config")
      return NextResponse.json({ error: 'Forbidden' }, {
        status: 403,
        headers
      })
    }

    if (!key || key !== result) {
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