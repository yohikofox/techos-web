import { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const providerOptions = {
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  issuer: process.env.AUTH0_ISSUER!
}


export const authOptions: AuthOptions = {
  logger: console as any,
  useSecureCookies: false,
  callbacks: {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  providers: [
    Auth0Provider(providerOptions)
  ]
}