import { IConfigManager } from "R/src/infrastructure/adapter/configManager"
import Container from "R/src/infrastructure/dependencyFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, params: any) {

  const configManager = await Container.Instance.resolve<IConfigManager>('Helper/ConfigManager')

  return NextResponse.redirect(`${await configManager.get("NEXT_PUBLIC_FRONT_URL")}/`, {
    status: 302,
    headers: {
      'Set-Cookie': 'auth=123; path=/; HttpOnly'
    }
  })
}


