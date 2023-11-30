import NextAuth from "next-auth/next";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  callbacks: {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!
    })
  ]
}


export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }