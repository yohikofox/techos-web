import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { NextRequest, NextResponse } from "next/server"
import { IOC } from "R/src/infrastructure/container";

export const dynamic = "force-dynamic"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest) {
  const config_key = request.nextUrl.searchParams.get("key")

  if (!config_key) {
    return badRequest();
  }

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const result = await configManager.reload(config_key)

  return NextResponse.json({ status: 'success', result })
}


