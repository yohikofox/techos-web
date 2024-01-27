import "server-only"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { IOC } from "R/src/infrastructure/container";
import React, { PropsWithChildren } from "react";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

import SessionProvider from "./SessionProvider";

export interface SessionHandlerProps extends PropsWithChildren {
  target?: string
}

export default async function SessionHandler({ children, target }: SessionHandlerProps) {

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const session = await getServerSession();

  const providers = await getProviders();

  if (!providers) {
    throw new Error('Providers not found')
  }

  let currentProvider = ''

  if (Object.keys(providers).length === 1) {
    currentProvider = `/${Object.keys(providers)[0]}`
  }

  const headersList = headers();

  const redirectUrl = `/api/auth/signin${currentProvider}?callbackUrl=${encodeURIComponent(`${await configManager.get("NEXT_PUBLIC_FRONT_URL")}${headersList.get('x-pathname') || target || ''}`)}`

  if (!session || !session.user) {
    redirect(redirectUrl)
  }

  return (
    <>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </>
  )
}