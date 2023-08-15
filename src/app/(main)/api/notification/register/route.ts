import Container from "@/business/dependencyFactory";
import { IConfigManager } from "@/business/infrastructure/adapter/configManager";
import { NextRequest, NextResponse } from "next/server"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest, params: any) {

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const publicKey = await configManager.get('WEB_PUSH_PUBLIC_KEY');

  const res = NextResponse.json({ api_key: publicKey })

  return res
}

