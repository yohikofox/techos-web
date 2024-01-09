import Container from "@/infrastructure/dependencyFactory";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params: { key } }: { params: { key: string } }) {

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  const result = await configManager.get(key)

  return NextResponse.json({ status: 'success', result })
}

