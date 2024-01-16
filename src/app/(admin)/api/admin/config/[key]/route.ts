import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { IOC } from "R/src/infrastructure/container";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params: { key } }: { params: { key: string } }) {

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const result = await configManager.get(key)

  return NextResponse.json({ status: 'success', result })
}

