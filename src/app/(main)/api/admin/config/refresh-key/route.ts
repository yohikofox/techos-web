import Container from "@/infrastructure/dependencyFactory";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest) {
  const config_key = request.nextUrl.searchParams.get("key")

  if (!config_key) {
    return badRequest();
  }

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const result = await configManager.reload(config_key)

  return NextResponse.json({ status: 'success', result })
}


