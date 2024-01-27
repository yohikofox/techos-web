import { NextRequest, NextResponse } from "next/server"
import { IOC } from "R/src/infrastructure/container";

import { ITokenGenerator } from "@/infrastructure/security/token"

export const dynamic = "force-dynamic"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest, params: any) {
  const tokenGenerator = await IOC().resolve<ITokenGenerator>('Helper/TokenGenerator')

  const ppk = await tokenGenerator.createKeyPair()

  return NextResponse.json(ppk)
}


