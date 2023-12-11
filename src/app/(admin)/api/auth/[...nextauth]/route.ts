import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

export const dynamic = "force-dynamic"

const handler = NextAuth(authOptions) as never

export { handler as GET, handler as POST }