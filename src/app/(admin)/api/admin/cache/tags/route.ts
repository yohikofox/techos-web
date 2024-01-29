import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // const Provider = CacheFactory.resolve()

  // const cacheProvider = new Provider({})

  // const cache = await cacheProvider.list<string>();

  // return NextResponse.json({ items: cache });

  return NextResponse.json({ items: [] });
}
