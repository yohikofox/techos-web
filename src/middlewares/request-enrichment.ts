import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

import { Middleware } from ".";
import { MiddlewareResult } from "./factory";

class RequestEnrichmentMiddleware extends Middleware {

  checkRoute(): boolean {
    return true
  }

  async run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    request.headers.set("x-pathname", request.nextUrl.pathname);
    return this.next(request, _next)
  }

  constructor(next: NextMiddleware) {
    super(next)
  }
}


export const requestEnrichmentMiddleware = (next: NextMiddleware): MiddlewareResult => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return new RequestEnrichmentMiddleware(next).execute(request, _next);
  }
}