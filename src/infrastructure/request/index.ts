import { NextRequest } from "next/server";

export default class RequestHelper {
  public static isSecured(request: NextRequest): boolean {
    return request.url.startsWith('https://') || process.env.FORCE_SECURED_COOKIES === 'true'
  }
}