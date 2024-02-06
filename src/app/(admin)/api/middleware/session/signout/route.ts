import { NextRequest, NextResponse } from "next/server";
import NextAuthManager from "R/src/infrastructure/auth/nextAuthManager";
import RequestHelper from "R/src/infrastructure/request";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const callbackUrl = new URL(request.url).searchParams.get("callbackUrl");

  const response = await new NextAuthManager().getSignOutRedirectData(
    callbackUrl !== undefined && callbackUrl !== null ? callbackUrl : "/",
    { headers: new Headers(request.headers) },
    { isSecured: RequestHelper.isSecured(request) }
  );

  if (response.isError === true) {
    return NextResponse.json(
      { error: "Forbidden" },
      {
        status: 403,
        headers: new Headers(request.headers),
      }
    );
  }

  const responseHeaders = new Headers();

  responseHeaders.set("set-cookie", response.cookies ?? "");
  responseHeaders.set("Cache-Control", "no-store");

  return NextResponse.json(response, {
    headers: responseHeaders,
  });
}
