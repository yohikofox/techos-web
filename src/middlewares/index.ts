import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export type MiddlewareResponse = {
  response: NextResponse,
  isNext: boolean,
  responseHeaders: Headers
}

export abstract class Middleware {
  private _response?: MiddlewareResponse;

  constructor(protected next: NextMiddleware) { }

  abstract checkRoute(request: NextRequest): boolean
  abstract run(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult>

  public async execute(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> {
    if (this.checkRoute(request)) {
      return this.run(request, _next)
    }

    return this.next(request, _next)
  }

  protected json(data: any, headers: Headers, init?: ResponseInit) {
    this._response = {
      response: NextResponse.json(data, init),
      isNext: false,
      responseHeaders: headers
    };

    return this._response;
  }

  protected redirect(url: string, headers: Headers, init?: ResponseInit) {
    this._response = {
      response: NextResponse.redirect(url, init),
      isNext: false,
      responseHeaders: headers
    };

    return this._response;
  }

  protected _next({ headers }: { headers: Headers }) {
    this._response = {
      response: NextResponse.next(),
      isNext: true,
      responseHeaders: headers
    };

    return this._response;
  }

  get response() {
    return this._response;
  }

  get isNext() {
    return !this._response;
  }
}


