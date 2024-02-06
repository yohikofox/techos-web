import { NextRequest, NextResponse } from "next/server"
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params: { key } }: { params: { key: string } }) {

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const result = await configManager.get(key)

  return NextResponse.json({ status: 'success', result })
}

