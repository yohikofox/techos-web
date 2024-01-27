import { NextRequest, NextResponse } from "next/server"
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

export const dynamic = "force-dynamic"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest, params: any) {

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const publicKey = await configManager.get('WEB_PUSH_PUBLIC_KEY');

  const res = NextResponse.json({ api_key: publicKey })

  return res
}


