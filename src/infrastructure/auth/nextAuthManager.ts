import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, getCsrfToken, getProviders as getNextAuthProviders } from "next-auth/react";
import { RedirectData, hash } from "R/src/middlewares/session";
import { cookies, headers } from 'next/headers';
import CookieManager from "../cookie";

export default class NextAuthManager {
  private _providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = null;
  private _CSRFToken: string | undefined = undefined;
  private _CSRFTokenHash: string | undefined = undefined;
  private _cookie: string | undefined = undefined;

  public async getSignInRedirectData(callbackUrl: string): Promise<RedirectData> {
    if (!this.providers()) {
      return { redirectUrl: '', isError: true }
    }

    if (Object.keys(this.providers()!).length > 1) {
      return { redirectUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signin` }
    }

    const providers = await this.providers()

    const provider = Object.keys(providers || {})[0]

    return await this.fetchSignInRedirectData(provider, callbackUrl)
  }

  public async getSignOutRedirectData(callbackUrl: string, { headers }: { headers: Headers }): Promise<RedirectData> {
    if (!this.providers()) {
      return { redirectUrl: '', isError: true }
    }

    if (Object.keys(this.providers()!).length > 1) {
      return { redirectUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/singout` }
    }
    const providers = await this.providers()

    const provider = Object.keys(providers || {})[0]

    return await this.fetchSignOutRedirectData(provider, headers, callbackUrl)
  }

  /**=============================================================================== */

  /**
   * http://localhost:3000/api/auth/logout
   */
  private async fetchSignInRedirectData(provider: string, callbackUrl: string) {
    const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signin/${provider}`

    console.debug("🚀 ~ NextAuthManager ~ fetchSignInRedirectData ~ url:", url)

    const fetchOptions: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1",
        cookie: `next-auth.csrf-token=${await this.cookie()}`,
      },
      credentials: "include",
      redirect: "follow",
      body: new URLSearchParams({
        csrfToken: await this.CSRFToken(),
        callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}${callbackUrl}`,
        json: "true",
      }),
      next: {
        revalidate: 0
      }
    }
    console.debug("🚀 ~ NextAuthManager ~ fetchSignInRedirectData ~ fetchOptions:", fetchOptions)

    const res = await fetch(url, fetchOptions);

    console.debug("🚀 ~ NextAuthManager ~ fetchSignInRedirectData ~ res:", res)

    if (!res.ok) {
      return { redirectUrl: '', isError: true }
    }

    const data = (await res.json()) as { url: string };
    const redirectUrl = data.url
    const responseCookies = res.headers.get("set-cookie") ?? undefined

    return { redirectUrl, cookies: responseCookies }
  }

  private async fetchSignOutRedirectData(provider: string, headers: Headers, callbackUrl: string) {
    const csrfToken = await this.CSRFToken()
    const cookieToken = await this.cookie()

    const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/signout`
    const h = new Headers(headers)

    h.set('Content-Type', 'application/x-www-form-urlencoded')

    const cookieManager = new CookieManager(h.get('cookie') || '')

    cookieManager.update('next-auth.csrf-token', cookieToken)
    cookieManager.remove('csrfToken')

    const fetchOptions: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        cookie: cookieManager.render()
      },
      body: new URLSearchParams({
        csrfToken,
        callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}${callbackUrl}`,
        json: "true",
      }),
      next: {
        revalidate: 0
      }
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      return { redirectUrl: '', isError: true }
    }

    const data = (await res.json()) as { url: string };
    const redirectUrl = data.url
    const responseCookies = res.headers.get("set-cookie") ?? undefined

    return { redirectUrl, cookies: responseCookies }
  }

  /**=============================================================================== */

  private async CSRFToken() {
    if (!this._CSRFToken) {
      this._CSRFToken = await this.getCSRFToken()
    }
    return this._CSRFToken
  }

  private async CSRFTokenHash() {
    if (!this._CSRFTokenHash) {
      this._CSRFTokenHash = await this.getCSRFTokenHash()
    }
    return this._CSRFTokenHash
  }

  private async cookie() {
    if (!this._cookie) {
      this._cookie = await this.getCookie()
    }
    return this._cookie
  }

  private async providers() {
    if (this._providers === null) {
      this._providers = await this.getProviders()
    }
    return this._providers
  }

  /**=============================================================================== */

  private async getCSRFToken() {
    return await getCsrfToken() || ''
  }

  private async getCSRFTokenHash() {
    const CSRFToken = await this.CSRFToken()
    const CSRFTokenHash = (await hash(`${CSRFToken}${process.env.NEXTAUTH_SECRET}`));
    return CSRFTokenHash
  }

  private async getCookie() {
    const CSRFToken = await this.CSRFToken()
    const CSRFTokenHash = await this.CSRFTokenHash()
    return `${CSRFToken}|${CSRFTokenHash}`
  }

  private async getProviders() {
    return await getNextAuthProviders()
  }

}