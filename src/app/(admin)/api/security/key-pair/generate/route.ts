import { NextResponse } from "next/server";
import { IOC } from "R/src/infrastructure/container";

import { ITokenGenerator } from "@/infrastructure/security/token";

export const dynamic = "force-dynamic";

export async function GET() {
  const tokenGenerator = await IOC().resolve<ITokenGenerator>(
    "Helper/TokenGenerator"
  );

  const ppk = await tokenGenerator.createKeyPair();

  return NextResponse.json(ppk);
}
