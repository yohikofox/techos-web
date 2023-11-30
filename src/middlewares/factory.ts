import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export type MiddlewareResult = (request: NextRequest, _next: NextFetchEvent) => any

export function stackMiddlewares(middlewares: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = middlewares[index];

  if (!current) {
    return (request: NextRequest, event: NextFetchEvent) => {
      return NextResponse.next({ headers: new Headers(request.headers) })
    };
  }

  const n = stackMiddlewares(middlewares, index + 1)
  return current(n);
}