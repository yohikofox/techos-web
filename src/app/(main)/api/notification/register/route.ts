import { IConfigManager } from "@infra/adapter/configManager";
import { IOC } from "@infra/container";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");

  const publicKey = await configManager.get("WEB_PUSH_PUBLIC_KEY");

  const res = NextResponse.json({ api_key: publicKey });

  return res;
}
