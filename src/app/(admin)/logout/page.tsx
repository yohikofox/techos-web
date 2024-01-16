'use client'
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"




function Page() {
  const session = useSession()
  // getSignInUrl
  const Part = session?.status === "authenticated" ? () => <button onClick={() => signOut()}>SignOut</button> : () => <button onClick={() => signIn('auth0')}>SignIn</button>

  return (
    <Part />
  )
}




export default function Wrapper() {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>
  )
}