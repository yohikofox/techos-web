import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

export const dynamic = "force-dynamic";

/**
 * e.g a webhook to `your-website.com/api/revalidate/path/collection?secret=<token>`
 *
 * @param request
 * @returns
 */
export async function POST(
  request: NextRequest,
  { params: { path } }: { params: { path: string } }
) {
  const secret = request.nextUrl.searchParams.get("secret");
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");

  const secretKey = await configManager.get("REVALIDATE_SECRET");

  if (secret === undefined || secretKey === undefined || secret !== secretKey) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (path === undefined) {
    return NextResponse.json(
      { message: "Missing path param" },
      { status: 400 }
    );
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
