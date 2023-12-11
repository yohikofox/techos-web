import RedisCacheHandler from 'R/src/infrastructure/cache/redis/redis-cache-handler';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const cache = await globalThis.redisClient?.get(params.id);
  if (!cache) return NextResponse.json("Not found", { status: 404 });

  return NextResponse.json({ ...JSON.parse(cache) });
}