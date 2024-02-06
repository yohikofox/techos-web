import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export type MiddlewareResult = (request: NextRequest, _next: NextFetchEvent) => Promise<NextMiddlewareResult>;

export function stackMiddlewares(middlewares: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = middlewares[index];

  if (current === undefined) {
    return (request: NextRequest) => {
      return NextResponse.next({ headers: new Headers(request.headers) })
    };
  }

  const n = stackMiddlewares(middlewares, index + 1)
  return current(n);
}