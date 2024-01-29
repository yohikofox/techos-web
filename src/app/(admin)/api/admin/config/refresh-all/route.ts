import { NextResponse } from "next/server";
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

export const dynamic = "force-dynamic";

export async function GET() {
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");

  await configManager.reloadAll();

  return NextResponse.json({ status: "success" });
}
