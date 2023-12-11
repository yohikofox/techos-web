import CacheFactory from 'R/src/infrastructure/cache/CacheFactory';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const Provider = CacheFactory.resolve()

  const cacheProvider = new Provider({})

  const cache = await cacheProvider.list<string>();

  return NextResponse.json({ items: cache });
}