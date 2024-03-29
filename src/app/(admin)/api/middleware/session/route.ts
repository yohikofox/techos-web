import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import NextAuthManager from "R/src/infrastructure/auth/nextAuthManager";
import RequestHelper from "R/src/infrastructure/request";
import { RedirectData } from "R/src/middlewares/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const callbackUrl = new URL(request.url).searchParams.get("callbackUrl");

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    const response: RedirectData =
      await new NextAuthManager().getSignInRedirectData(
        callbackUrl !== null ? callbackUrl : "/",
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

    return NextResponse.json(response);
  }

  return NextResponse.next({ headers: new Headers(request.headers) });
}

//"docker run --gpus all -e HF_TOKEN=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 -p 8000:8000 ghcr.io/mistralai/mistral-src/vllm:latest --host 0.0.0.0 --model mistralai/Mistral-7B-Instruct-v0.2"
