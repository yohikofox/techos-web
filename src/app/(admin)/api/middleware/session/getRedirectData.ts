import { getCsrfToken, getProviders } from "next-auth/react";
import { NextRequest } from "next/server";
import { Machin, hash } from "R/src/middlewares/session";

export async function getRedirectData(request: NextRequest, callbackUrl: string): Promise<Machin> {

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
      callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}${callbackUrl}`,
      json: "true",
    }),
  });

  if (!res.ok) {
    return { redirectUrl: '', isError: true }
  }

  const data = (await res.json()) as { url: string };
  const redirectUrl = data.url
  const responseCookies = res.headers.get("set-cookie") ?? undefined

  return { redirectUrl, cookies: responseCookies }
}