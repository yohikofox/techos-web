import Container from "@/business/dependencyFactory";
import { IConfigManager } from "@/business/infrastructure/adapter/configManager";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest) {

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const result = await configManager.reloadAll()

  return NextResponse.json({ status: 'success' })
}


