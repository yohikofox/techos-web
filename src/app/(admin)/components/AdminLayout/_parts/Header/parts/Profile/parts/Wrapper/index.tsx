import SessionProvider from "@Admin/components/SessionHandler/SessionProvider";
import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}