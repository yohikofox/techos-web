import { NextRequest, NextResponse } from "next/server"
import { IConfigManager } from "R/src/infrastructure/adapter/configManager"
import { IOC } from "R/src/infrastructure/container";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, params: any) {

  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  return NextResponse.redirect(`${await configManager.get("NEXT_PUBLIC_FRONT_URL")}/`, {
    status: 302,
    headers: {
      'Set-Cookie': 'auth=123; path=/; HttpOnly'
    }
  })
}


